```javascript
async function foo() {
    console.log("start");
    await bar();
    console.log("end");
}

async function bar() {
    console.log("bar");
}

console.log(1);

setTimeout(() => {
    console.log("time");
});

foo();

new Promise((resolve) => {
    console.log("p1");
    resolve();
}).then(() => {
    console.log("p2");
});

console.log(2);
```

### 第一步
1. 执行``console.log(1)``，输出``1``
2. 执行``foo()``,``foo()``函数里面``console.log("start");``  
``await bar();``相当于``Promise(bar()).then(() => console.log("end"))``  
``bar()``是同步，输出``start`` ``bar``  
``console.log("end");``是微任务
3. ``setTimeout``为宏任务
4. ``new Promise``中的``console.log("p1");``为同步，输出``p1``  
``console.log("p2");``是微任务
5. 执行``console.log(2);`` 输出``2``
> 宏任务：``setTimeout``  
> 微任务：``console.log("end");``, ``console.log("p2");`` 
> 输出顺序： ``1 start bar p1 2 ``
### 第二步
1. 完成微任务 ``console.log("end");`` 输出``end``
2. 完成微任务 ``console.log("p2");`` 输出``p2``   
3. 完成宏任务 ``setTimeout``中的``console.log("time");``,输出``time``
> 输出顺序: ``1 start bar p1 2 end p2 time``