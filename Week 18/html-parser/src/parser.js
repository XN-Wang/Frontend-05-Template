
const EOF = Symbol('EOF')
let stack
let currentToken = null
let currentAttribute = null
let currentTextNode = null

function emit(token) {
    let top = stack[stack.length - 1]
    if (token.type == 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: []
        }
        element.tagName = token.tagName
        for(let p in token) {
            if(p !== 'type' && p !== 'tagName') {
                element.attributes.push({
                    name: p,
                    value: token[p]
                })
            }
        }
        //当前节点和栈顶节点创建父子关系
        top.children.push(element)
        element.parent = top
        if(!token.isSelfClosing) {
            stack.push(element)
        }
        currentTextNode = null
    } else if(token.type == 'endTag') {
        if (top.tagName !== token.tagName) {
            throw new Error("Tag start end doesn't match")
        } else {
            stack.pop()
        }
        currentTextNode = null
    } else if(token.type == 'text') {
        if (currentTextNode == null) {
            currentTextNode = {
                type: 'text', 
                content: ''
            }
            top.children.push(currentTextNode)
        }
        currentTextNode.content += token.content
    }
}

function data(c) {
    if (c == '<') {
        return tagOpen
    } else if (c == EOF) {
        emit({
            type: 'EOF'
        })
        return
    } else {
        //文本节点
        emit({
            type: 'text',
            content: c
        })
        return data
    }
}
//标签开始状态
function tagOpen(c) {
    if (c == '/') {
        //结束标签
        return endTagOpen
    } else if (c.match(/^[a-zA-Z]$/)) {
        //开始标签或自封闭标签
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        emit({
            type: 'text',
            content: c
        });
        return data;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c == '>') {
    } else if (c == EOF) {
    } else {
    }
}

function tagName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        //tab符、换行符、禁止符和空格,<html prop>
        return beforeAttributeName
    } else if(c == '/') {
        //<html/>
        return selfClosingStartTag
    } else if(c.match(/^[A-Z]$/)) {
        currentToken.tagName += c
        return tagName
    } else if(c == '>') {
        emit(currentToken)
        return data
    } else {
        currentToken.tagName += c
        return tagName
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return afterAttributeName(c)
    } else if (c == '=') {
        return beforeAttributeValue
    } else if (c == '\u0000') {
    } else if (c == "\"" || c == "'" || c == "<") {
    } else {
        currentAttribute.name += c
        return attributeName
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c == '>' || c == '/' || c == EOF) {
        return afterAttributeName(c)
    } else if (c == '=') {
        return beforeAttributeName
    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c)
    }
}

function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c == "=") {
        return beforeAttributeValue;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {
    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: "",
            value: "",
        }
        return attributeName(c);
    }
}

function beforeAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/) || c == '/' || c == '>' || c == EOF) {
        return beforeAttributeValue
    } else if(c == "\"") {
        return doubleQuotedAttributeValue
    } else if(c == "\'") {
        return singleQuotedAttributeValue
    } else if(c == ">") {
    } else {
        return UnquotedAttributeValue(c)
    }
}

function doubleQuotedAttributeValue(c) {
    if (c == "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if(c == '\u0000') {
    } else if(c == EOF) {
    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(c) {
    console.log('c', c)
    if (c == "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if(c == '\u0000') {
    }  else if(c == EOF) {
    } else {
        currentAttribute.value += c
        return singleQuotedAttributeValue
    }
}

function UnquotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        //空格是UnquotedAttribute结束的标志，把currentAttribute的name和value挂到currentToken
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if(c == '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if(c == '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if(c == '\u0000') {
    } else if(c == "\"" || c == "'" || c == "<" || c == "=" || c == "`") {
    } else if(c == EOF) {
    } else {
        currentAttribute.value += c
        return UnquotedAttributeValue
    }
}

//<div id="a"x不合法，双引号后需要跟>或空格+属性名，
function afterQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == EOF){
        // 错误
    }else{
        throw new Error("unexpected charater \"" + c + "\"");
    }
}


function selfClosingStartTag(c) {
    if (c == '>') {
        currentToken.isSelfClosing = true
        emit(currentToken)
        return data
    } else if (c == EOF) {
    } else {
    }
}

export function parseHTML(html) {
    stack = [{type: 'document', children: []}]
    currentToken = null
    currentAttribute = null
    currentTextNode = null
    let state = data
    for(let c of html) {
        state = state(c)
    }
    state = state(EOF)
    return stack[0]
}