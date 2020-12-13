const css = require('css')
const EOF = Symbol('EOF')
const layout = require('./layout.js')
let currentToken = null
let currentAttribute = null
let stack = [{type: 'document', children: []}]
let currentTextNode = null
let rules = []

function addCSSRules(text) {
    var ast = css.parse(text)
    console.log(JSON.stringify(ast, null, '    '))
    rules.push(...ast.stylesheet.rules)
}

function match(element, selector) {
    if(!selector || !element.attributes) {
        return false
    }

    if (selector.charAt(0) === '#') {
        var attr = element.attributes.filter(attr => attr.name === 'id')[0]
        if (attr && attr.value === selector.replace('#', '')) {
            return true
        }
    } else if(selector.charAt(0) === '.') {
        var attr = element.attributes.filter(attr => attr.name === 'class')[0]
        if (attr && attr.value === selector.replace('.', '')) {
            return true
        }
    } else {
        if (element.tagName === selector) {
            return true
        }
    }
    return false
}

function specificity(selector) {
    //[inline, id, class, tag]
    var p = [0, 0, 0, 0]
    var selectorParts = selector.split(" ")
    for(var part of selectorParts) {
        if(part.charAt(0) === '#') {
            p[1] += 1
        } else if(part.charAt(0) === '.') {
            p[2] += 1
        } else {
            p[3] += 1
        }
    }
    return p
}

function compare(sp1, sp2) {
    if (sp1[0] - sp2[0]) {
        return sp1[0] - sp2[0]
    }
    if (sp1[1] - sp2[1]) {
        return sp1[1] - sp2[1]
    }
    if (sp1[2] - sp2[2]) {
        return sp1[2] - sp2[2]
    }
    return sp1[3] - sp2[3]
}

function computeCSS(element) {
    let elements = stack.slice().reverse()
    if(!element.computedStyle) {
        element.computedStyle = {}
    }

    for(let rule of rules) {
        var selectorParts = rule.selectors[0].split(" ").reverse()
        if(!match(element, selectorParts[0])) {
            continue
        }

        let matched = false

        var j = 1
        for(var i = 0; i < elements.length; i++) {
            if (match(elements[i], selectorParts[i])) {
                j++
            }
        }

        if(j >= selectorParts.length) {
            matched = true
        }

        if (matched) {
            var sp = specificity(rule.selectors[0])
            var computedStyle = element.computedStyle
            for(var declaration of rule.declarations) {
                if(!computedStyle[declaration.property]) {
                    computedStyle[declaration.property] = {}
                }
                if(!computedStyle[declaration.property].specificity) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                } else if(compare(computedStyle[declaration.property].specificity, sp) < 0) {
                    computedStyle[declaration.property].value = declaration.value
                    computedStyle[declaration.property].specificity = sp
                }
            }
        }
    }
}

function emit(token) {
    let top = stack[stack.length - 1]
    if (token.type === 'startTag') {
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
        //重点在于计算 css 时机，在 startTag 入栈的时候去操作的
        computeCSS(element)
        //当前节点和栈顶节点创建父子关系
        top.children.push(element)
        //element.parent = top

        if(!token.isSelfClosing) {
            stack.push(element)
        }

        currentTextNode = null
    } else if(token.type === 'endTag') {
        if (top.tagName !== token.tagName) {
            throw new Error("Tag start end doesn't match")
        } else {
            //遇到style标签时，执行添加css规则的操作，只考虑<style>标签和内联样式，link标签涉及多个html请求，暂不处理
            if (top.tagName === 'style') {
                addCSSRules(top.children[0].content)
            }
            layout(top)
            stack.pop()
        }
        currentTextNode = null
    } else if(token.type === 'text') {
        if (currentTextNode === null) {
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
    if (c === '<') {
        return tagOpen
    } else if (c === EOF) {
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
    if (c === '/') {
        //结束标签
        return endTagOpen
    } else if (c.match(/^[a-zA-Z!]$/)) {
        //开始标签或自封闭标签
        currentToken = {
            type: 'startTag',
            tagName: ''
        }
        return tagName(c)
    } else {
        return
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c === '>') {

    } else if (c === EOF) {

    } else {

    }
}

function tagName(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        //tab符、换行符、禁止符和空格,<html prop>
        return beforeAttributeName
    } else if(c === '/') {
        //<html/>
        return selfClosingStartTag
    } else if(c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c
        return tagName
    } else if(c === '>') {
        emit(currentToken)
        return data
    } else {
        return tagName
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c)
    } else if (c === '=') {
        return beforeAttributeValue
    } else if (c === '\u0000') {

    } else if (c === "\"" || c === "'" || c === "<") {

    } else {
        currentAttribute.name += c
        return attributeName
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName
    } else if (c === '>') {
        return afterAttributeName(c)
    } else if (c === '/') {
        return selfClosingStartTag
    } else if (c === '=') {
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
        return afterAttributeName(c);
    } else if (c === "/") {
        return selfClosingStartTag;
    } else if (c === "=") {
        return beforeAttributeValue;
    } else if (c === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === EOF) {
    
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
    if(c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return beforeAttributeValue
    } else if(c === "\"") {
        return doubleQuotedAttributeValue
    } else if(c === "\'") {
        return singleQuotedAttributeValue
    } else if(c === ">") {

    } else {
        return UnquotedAttributeValue(c)
    }
}

function doubleQuotedAttributeValue(c) {
    if (c === "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if(c === '\u0000') {

    } else if(c === EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function singleQuotedAttributeValue(c) {
    if (c === "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value
        return afterQuotedAttributeValue
    } else if(c === '\u0000') {

    }  else if(c === EOF) {

    } else {
        currentAttribute.value += c
        return doubleQuotedAttributeValue
    }
}

function UnquotedAttributeValue(c) {
    if(c.match(/^[\t\n\f ]$/)) {
        //空格是UnquotedAttribute结束的标志，把currentAttribute的name和value挂到currentToken
        currentToken[currentAttribute.name] = currentAttribute.value
        return beforeAttributeName
    } else if(c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value
        return selfClosingStartTag
    } else if(c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value
        emit(currentToken)
        return data
    } else if(c === '\u0000') {

    }  else if(c === EOF) {

    } else {
        currentAttribute.value += c
        return UnquotedAttributeValue
    }
}

//<div id="a"x不合法，双引号后需要跟>或空格+属性名，
function afterQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c === "/"){
        return selfClosingStartTag;
    }else if(c === '>'){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data
    }else if(c === EOF){
        // 错误
    }else{
        return beforeAttributeName(c);
    }
}


function selfClosingStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true
        emit(currentToken)
        return data
    } else if (c === EOF) {

    } else {

    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data
    for(let c of html) {
        state = state(c)
    }
    state = state(EOF)
    return stack[0]
}