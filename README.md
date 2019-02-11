## brazilian-tabs
產生動態頁籤
## 前置安裝
    jQuery
## 安裝
1.用npm指令安裝
```sh
npm install brazilian-tabs
```
2.用html語法引入
```html
<script src="brazilian-tabs/brazilian-tabs.jquery.js"></script>
```
#### Vue
```javascript
require('brazilian-tabs/brazilian-tabs.jquery.js');
```
## Demo
[Demo on jsFiddle](https://jsfiddle.net/Palehorse/vw8ctne2/39)
## 使用方法
#### HTML
```html
<ul id="brazilian-tabs">
  <li>Tab1</li>
  <li>Tab2</li>
  <li>Tab3</li>
</ul>
```
#### JavaScript
```javascript
$('#brazilian-tabs').braziliantabs();
```
## Callbacks
#### 選定某一個頁籤
```javascript
$('#brazilian-tabs').braziliantabs({
    onItemSelect: function(tab, content) {
        tab.css({'font-weight':'bold','font-size':20});
        //Do something when a tab is selected.
    }
});
```
#### 當某個頁籤失去選定
```javascript
$('#brazilian-tabs').braziliantabs({
    onItemUnselect: function(tab, content) {
        tab.css({'font-weight':'normal','font-size':14});
        //Do something when a tab blurs.
    }
});
```
