document.writeln('hello world!');

/**
    下面的值被当做假(falsy)
    . false
    . null
    . undefined
    . 空字符串
    . 数字0
    . 数字 NaN
    其他所有的值都被当做真，包括字符串"false"

*/

// method定义新方法
Function.prototype.method = function (name, func){
    this.prototype[name] = func;
    return this;
}

/**
    对象字面量
    
    需要注意的是JavaScript不强制要求引号扩住属性名。
    所以括住first_name、last_name不是必须的，但是如果是first-name、last-name则是必须的，因为JavaScript的连接符(-)是不合法的。
*/
var stooge = {
    "first_name" : "Jerome",
    "last_name" : "Howard"
}

document.writeln(stooge.first_name);
document.writeln(stooge["first_name"]);
// 尝试一个不存在的成员属性会返回undefined
document.writeln(stooge.second_name);

// 对象字面量可嵌套
var flight = {
    airline : "Oceanic",
    number : 815,
    departure : {
        IATA : "SYD",
        time : "2017-10-10",
        city : "Sydney"
    },
    arrival : {
        IATA : "LAX",
        time : "2017-11-11",
        city : "Los Angeles"
    }
    
}

// 可以使用||运算符来填充默认值
document.writeln(stooge.second_name || "(none)");
document.writeln(flight.status || "unkown");

// undefined
document.writeln(flight.equipment);
// throw "TypeError"
// document.writeln(flight.equipment.model)
// 使用&&运算符避免"TypeError"
document.writeln(flight.equipment && flight.equipment.model);

document.writeln(flight.departure.IATA);

// 如果对象里面有属性，更新会替换以前的值；如果没有该属性会新增属性到对象
stooge.first_name = "John";
document.writeln(stooge.first_name);
document.writeln("stooge.middle_name is " + stooge.middle_name);
stooge.middle_name = "welcome";
document.writeln("After update. stooge.middle_name is " + stooge.middle_name);

// 会包含原型链中的属性
for(myvar in stooge){
    if(stooge.hasOwnProperty(myvar)){
        document.writeln("for each in stooge property " + myvar + " and value is " + stooge[myvar]);
    }
}

// 对象通过引用来传递，它们永远不会被复制
var x = stooge;
x.nickname = "Jacky";
document.writeln("stooge.nickname is " + stooge.nickname);

// 原型 Prototype
/** 

    每一个对象都连接到一个原型对象，并且可以从中继承属性。所有通过对象字面量创建的对象都连接到Object.prototype，它是JavaScript的标配对象
    当你创建一个对象时，你可以选择某个对象作为其原型。
  
 */
 
 // 给Object增加一个create方法，用来创建使用原对象作为其原型的新对象
 if(typeof Object.beget !== 'function'){
     Object.create = function(o){
         var F = function(){};
         F.prototype = 0;
         return new F();
     }
 }
 
 /** 
 
    原型连接在更新时不起作用，只有在检索值的时候才被用到。如果尝试获取的属性在该对象中不存在，那么会试着从原型对象中回去属性值。如果原型对象还没有该属性，
    那么在从它的原型开始查找，以此类推，直到该过程最终到达Object.prototype
    原型关系是动态关系，如果我们添加一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见。
    
 */
 
 // 查看属性的类型
 document.writeln("stooge.first_name type is " + (typeof stooge.first_name));
 document.writeln("stooge.first_name type is " + (typeof 123456));
 document.writeln("stooge.first_name type is " + (typeof stooge));
 document.writeln("stooge.first_name type is " + (typeof stooge.staus));
 document.writeln("stooge.first_name type is " + (typeof stooge.toString));
 
 // 原型链中的任何属性都会产生值，一般来说获取对象自身信息时，关注的更多是数据。可以丢弃值为函数的类型或者使用hasOwnProperty方法，这个方法不会检查原型链，只会检查对象本身。
 
 // 删除属性,delete运算符
 var F = function(){};
 F.prototype = stooge;
 var another_stooge = new F();
 stooge.del = "delete operator";
 document.writeln("stooge del property is " + stooge.del);
 delete stooge.del;
 document.writeln("after delete stooge del property is " + stooge.del);
 another_stooge.nickname = "Mode";
 document.writeln("another_stooge.nickname property is " + another_stooge.nickname);
 // another_stooge也定义了nickname属性，删除该属性会让原型链中的属性透现出来
 delete another_stooge.nickname;
 document.writeln("another_stooge.nickname property is " + another_stooge.nickname);
 
 // 函数对象
 // 没有给函数命名的函数被称为匿名函数
 var add = function (a, b){
     return a + b;
 };
 
 // 函数调用
 /** 
    
   每个函数接收两个附加的参数：this和arguments。
   this的值取决于调用的模式：方法调用模式、函数调用模式、构造器调用模式、apply调用模式
   实参与形参的个数不匹配时不会导致运行时错误；实参个数多了，超出的参数值会被忽略；如果实参的个数少了，那么缺失的参数被替换为undefin。
   不对参数的类型进行检查，任何类型的值都可以传递。

 */
 
 // 方法调用模式
 var myObject = {
     value : 0,
     increment : function (inc){
         this.value += (typeof inc === 'number' ? inc : 1);
     }
 };
 myObject.increment();
 document.writeln("myObject increment default:" + myObject.value);
 myObject.increment(2);
 document.writeln("myObject increment 2:" + myObject.value);
 
 // 函数调用模式
 // 当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用：
 document.writeln("add function result:" + add(10, 11));
 // 在此模式下，this被绑定到全局对象。这个特性使得外部函数不能使用内部函数帮助完成它的工作，因为内部函数的this没有被绑定到外部函数变量中。
 
 // ?????
 myObject.double = function (){
     var that = this;
     document.writeln("myObject double function this reference:" + this.value);
     var helper = function (){
         that.value = add(that.value, that.value);
     };
     helper();
 }
 myObject.double();
 document.writeln("myObject double value:" + myObject.value);
 
 // 构造器调用模式
 var Quo = function (string){
     this.status = string;
 }
 Quo.prototype.get_status = function(){
     return this.status;
 }
 var myQuo = new Quo("confused");
 document.writeln("Quo status is " + myQuo.get_status());
 document.writeln("Quo status is " + Quo.staus);
 // 如果一个函数创建的目的是希望结合new来调用，那么它被称为构造器函数。按照约定，他们被保存在以大写格式命名的变量里。不推荐这样使用！！！
 
 /**
 
    Apply调用模式
    
    JavaScript是一门函数式的面向对象编程语言，因此函数可以拥有方法。
    apply方法让我们构建一个参数数组传递给调用函数。它也允许我们选择this的值。apply方法接收两个参数：第一个是要绑定给this的值；第二个是一个参数数组。
 
 */
 var array = [3, 4];
 var sum = add.apply(null, array);
 document.writeln("apply invocation add fun " + sum);
 var statusObject = {
     status : "A-OK"
 };
 /**
 
    尽管statusObject没有继承自Quo.prototype，但是我们可以在statusObject上调用get_status方法，因为我们把statusObject绑定到get_status方法的this上啦
 
 */
 var status = Quo.prototype.get_status.apply(statusObject);
 document.writeln(status)
 
 /** 
 
    参数
    
    当函数被调用时会得到一个免费配送的参数，那就是arguments数组。函数可以同伙此参数访问所有它被调用时传递给它的参数列表，包括那些没有被分配给函数声明时定义的形式参数的多余参数。
    这使得编写一个无须指定参数个数的函数成为可能：
 
 */
 /**
 
    构造一个将大量的值相加的函数
    函数内部的变量sum不会与函数外部定义的sum产生冲突
 
 */
 var sum = function (){
     var i, sum = 0;
     for(i = 0; i < arguments.length; i++){
         sum += arguments[i];
     }
     return sum;
 }
 document.writeln(sum(4, 5, 6, 7, 8, 9, 10));
 /** 

    这不是一个特别有用的模式，下文会看到如何给数组添加一个相似的方法达到同样的效果。
    而且这是一个设计错误，arguments并不是一个真正的数组。它只是一个类似数组，拥有一个length属性，但它没有任何数组方法。
    下文将会展示这个设计错误导致的后果。

 */
 
 /**
 
    返回
    
    当一个函数被调用时，它从第一个语句开始执行，并在遇到关闭函数体的}时结束。然后函数会把控制权交给调用该函数的程序。
    return语句可以用来使函数提前返回。当return被执行时，函数立即返回而不再执行余下的语句。
    一个函数总是会返回一个值。如果没有执行返回值，则返回undefined。
    如果在函数调用时在前面加上了new前缀，且返回值不是一个对象，则返回this(该新对象)。
 
 */
 
 /**
 
    异常
    
    JavaScript提供了一套异常处理机制。异常是干扰程序的正常流程的不寻常(并非完全是出乎意料的)的事故。
    当发现这样的事故时，需要抛出异常。
 
 */
 var add2 = function (a, b){
     if((typeof a !== 'number') || (typeof b !== 'number')){
         throw {
             name : 'TypeError',
             message : 'add needs numbers'
         };
     }
     return a + b;
 }
 // throw语句会中断函数的执行。
 var try_it = function (){
     try{
         add2('serve');
     }catch(e){
         document.writeln("try_it exceptions:" + e.name + ";" + e.message);
     }
 };
 try_it();
 
 // 扩充类型的功能
 Function.prototype.method = function (name, func){
     // 保险的方法是没有该方法时才添加它
     if(!this.prototype[name]){
        this.prototype[name] = func;
     }
     return this;
 };
 // 增加一个integer方法改善取整的操作
 Number.method('integer', function (){
    return Math[this < 0 ? 'ceil' : 'floor'](this); 
 });
 document.writeln("Math floor integer " + Math.floor(-1.123));
 document.writeln("Math floor integer " + Math.floor(10 / 3));
 document.writeln("Number method integer " + (10 / 3).integer());
 // 增加一个移除字符串首尾空白的方法
 String.method('trim', function (){
     return this.replace(/^\s+|\s+$/g, "");
 });
 document.writeln('"' + " neat   " + '"');
 document.writeln('"' + " neat   ".trim() + '"');
 
 // 递归
 
 var hanoi = function (disc, src, aux, dst){
     if(disc > 0){
         hanoi(disc - 1, src, dst, aux);
         document.writeln("Move disc " + disc + ' from ' + src + " to " + dst);
         hanoi(disc - 1, aux, src, dst);
     }
 }
 hanoi(5, "Src", "Aux", "Dst");
 
 var walk_the_Dom = function walk(node, func){
     func(node);
     node = node.firstChild;
     while(node){
         walk(node, func);
         node = node.nextSibling;
     }
 }
 
 /**
 
    尾递归优化
    
    如果一个函数返回自身递归调用的结果，那么调用的过程会被替换为一个循环，它可以显著的提高性能。
    遗憾的是，JavaScript并没有提供尾递归优化。
    同时需要注意的是深度递归函数可能会因为堆栈溢出而运行失败。
 
 */
 var factorial = function factorial(i, a){
     a = a || 1;
     if(i < 2){
         return a;
     }
     return factorial(i - 1, a * i);
 };
 document.writeln(factorial(4, 4));
 
 /** 

    作用域
    
    作用域减少了名称冲突，并且提供了自动内存管理。
    实际上JavaScript并不支持块级作用域。
    函数中的参数和变量在函数外部是不可见的，而在一个函数内部任何位置定义的变量，在该函数内部任何地方都可见。
 
 */
 
 var foo = function (){
     var a = 3, b = 5;
     document.writeln("1 a = " + a + " b = " + b);
     var bar = function (){
         var b = 7, c = 11;
         a += b + c;
         document.writeln("2 a = " + a + " b = " + b + " c = " + c);
     }
     document.writeln("3 a = " + a + " b = " + b);
     bar();
 };
 foo();
 
 // 闭包
 // 内部函数可以拥有比外部函数更长的生命周期。
 var myObject1 = (function (){
     var value = 0;
     return {
       increment : function (inc){
         value += (typeof inc === 'number' ? inc : 1);  
       },
       getValue : function (){
           return value;
       }
     };
 }());
 myObject1.increment(3);
 document.writeln(myObject1.getValue());
 
 // quoo被设计成无须使用new来使用，所以名字也没有首字母大写
 var quoo = function (status){
     return {
         // get_status方法返回的不是status参数的副本，而是参数本身
         get_status : function (){
            return status;
         }
     }
 };
 document.writeln(quoo("amazed").get_status());

 var fade = function (node){
     var level = 1;
     var step = function (){
       var hex = level.toString(16);
       node.style.background = '#FFFF' + hex + hex;
       if(level < 15){
           level += 1;
           // 只要fade的内部函数需要，变量就会持续保留
           setTimeout(step, 100);
       }
     };
     setTimeout(step, 100);
 };
 // HTML的<body>标签
 fade(document.body);
 
 // 理解内部函数能访问外部函数的实际变量而无须复制很重要
 // 糟糕的例子
 var add_the_handlers = function (nodes){
     var i;
     for(i = 0; i < nodes.length; i++){
         nodes[i].onclick = function (){
             alert(i);
         };
     }
 };
 // 结束糟糕的例子
 // add_the_handlers(document.body.childNodes);
 // add_the_handlers函数本身是想传递给每个事件处理器唯一值(i)。但是未达到目的，因为事件处理器函数绑定了变量i，而不是函数在构建时的变量i。
 
 // 以下是改进版
 var add_the_handlerss = function (nodes){
     var helper = function (i){
         // 加一个参数e是为了获取传入的事件
         return function (e){
           document.writeln(e.toString());
           alert(i);  
         };
     }
     var i;
     for(i = 0; i < nodes.length; i++){
         // 应当避免在循环中创建函数，他可能会带来无谓的计算，还会引起混淆
         // 可以像上面的例子在循环外创建一个辅助函数
         nodes[i].onclick = helper(i);
     }
 }
 add_the_handlerss(document.body.childNodes);
 
 /** 
 
    回调
    
    


*/ 

 /** 
 
    模块
    
    请好好理解一下下面的deentityify例子。☆☆☆☆☆
    
    涉及到()运算符以及变量存储初始化问题。
    模块的一般形式是：一个定义是有变量和函数的函数；利用闭包创建可以访问是有变量和函数的特权函数；最后返回这个特权函数。
    
    模块模式可以摒弃全局变量的使用。它促进了信息隐藏和其他优秀的设计实践。
    
    模块模式可以产生安全的对象。

*/
String.method('deentityify', function (){
    var entity = {
        quot : '"',
        lt : "<",
        gt : ">"
    };
    document.writeln('&lt;&quot;&gt; entity....');
    return function (){
        return this.replace(/&([^&;]+);/g, function (a, b) {
            var r = entity[b];
            return (typeof r === 'string' ? r : a);
        });
    };
}());
document.writeln('&lt;&quot;&gt;'.deentityify());
document.writeln('&lt;&lt;&quot;&gt;&gt;'.deentityify());

var serial_maker = function (){
    var prefix = "";
    var seq = 0;
    return {
      set_prefix : function (p){
          prefix = String(p);
      },
      set_seq : function (s){
          seq = s;
      },
      gensym : function(){
          var result = prefix + seq;
          seq += 1;
          return result;
      }
    };
};
var seqer = serial_maker();
seqer.set_prefix("Q");
seqer.set_seq(10000);
var unique = seqer.gensym();
document.writeln(unique);

// 级联 链式调用

/** 

    柯里化
    
    函数也是值，从而我们可以把函数与传递给其他参数相结合，产生新的函数。
    

 */
 Function.method("curry", function(){
    var slice = Array.prototype.slice;
    var args = slice.apply(arguments), that = this;
    return function(){
      return that.apply(null, args.concat(slice.apply(arguments)));  
    };
 });
 var add1 = add.curry(1);
 document.writeln(add1(6));

 /**
 
    记忆
    
    函数可以将先前操作的结果记录在某个对象里，从而避免无谓的重复运算。
    JavaScript的对象和数组要实现这种优化是非常方便的。
    
 
 
 */
 var fibonacci_count = 0;
 var fibonacci = function (n){
     fibonacci_count++;
   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);  
 };
 
 // 这样实现是可以的，但是fibonacci函数做了很多无谓的操作
 for(var i = 0; i <= 10; i++){
     document.writeln('//' + i + ': ' + fibonacci(i));
 }
 document.writeln('11 times fibonacci invoke takes ' + fibonacci_count);
 
 // 修订版 
 var fibonaccis_count = 0;
 var fibonaccis = function (){
     var memo = [0, 1];
     var fib = function (n){
         var result = memo[n];
         if(typeof result !== 'number'){
             fibonaccis_count++;
             result = fib(n - 1) + fib(n - 2);
             memo[n] = result;
         }
         return result;
     }
     return fib;
 }();
 for(var i = 0; i <= 10; i++){
     document.writeln('//' + i + ': ' + fibonaccis(i));
 }
 
 document.writeln('11 times fibonaccis invoke takes ' + fibonaccis_count);
 
 var memoizer = function (memo, formula){
   var recur = function (n){
       var result = memo[n];
       if(typeof result !== 'number'){
           result = formula(recur, n);
           memo[n] = result;
       }
       return result;
   };
    return recur;
 };
 var fibo = memoizer([0, 1], function (recur, n){
     return recur(n - 1) + recur(n - 2);
 })
 document.writeln(fibo(11));
 var factor = memoizer([1, 1], function (recur, n){
     return n * recur(n -1 );
 });
 document.writeln(factor(3));
 
 /** 
 
    继承
    
    JavaScript是一门基于原型的语言，这意味着对象直接从其他对象继承。
    

 */
 
 /**
 
    伪装
    
    不直接让对象从其他对象继承，反而插入了一个中间层，通过构造器函数产生对象。
    当一个函数对象被创建时，Function构造器产生的函数对象会运行类似这样的代码：
    this.prototype = {constructor : this};
    新函数对象被赋予一个prototype属性，它的值就是一个包含constructor属性且属性值为该新函数的对象。
    prototype对象就是存放继承特征的地方。
    因为JavaScript语言没有提供一种方法确定哪个函数是打算用来做构造器的，所以每个函数都会得到一个prototype对象。
    
    当使用new前缀去调用一个函数时，函数执行的方式会被修改。
 
 */
 
 var Mammal = function (name){
     this.name = name;
 };
 Mammal.prototype.get_name = function (){
     return this.name;
 };
 Mammal.prototype.says = function (){
     return this.saying || '';
 }
 var myMammal = new Mammal('Herb the Mammal');
 document.writeln(myMammal.get_name());
 
 var Cat = function (name){
     this.name = name;
     this.saying = "meow";
 }
 
 // 替换Cat.prototype为一个新的Mammal实例
 Cat.prototype = new Mammal();
 Cat.prototype.purr = function (n) {
     var i, s = '';
     for(i = 0; i < n; i++){
         if(s){
             s += '-';
         }
         s += 'r';
     }
     return s;
 };
 Cat.prototype.get_name = function (){
     return this.says() + " " + this.name + " " + this.says();
 };
 var myCat = new Cat('Henrietta');
 var says = myCat.says();
 var ppurr = myCat.purr(5);
 var name = myCat.get_name();
 document.writeln(says);
 document.writeln(ppurr);
 document.writeln(name);
 
 // 伪类模式本意是向面向对象靠拢，但看起来有点格格不入。我们可以隐藏一些细节，定义一个inherits方法实现：
 Function.method("inherits", function (Parent){
     this.prototype = new Parent();
     return this;
 });
 
 var Dog = function (name){
     this.name = name;
     this.saying = "Bos";
 }.inherits(Mammal).method('wow', function (n){
     var i, s = '';
     for(i = 0; i < n; i++){
         if(s){
             s += '-'
         }
         s += "wangwang";
     }
     return s;
     
 }).method('get_names', function (){
     return this.says() + " " + this.name + " " + this.says();
 });
 var dog = new Dog('Giwawa');
 document.writeln(dog.says());
 document.writeln(dog.wow(5));
 document.writeln(dog.get_names());
 
 
 