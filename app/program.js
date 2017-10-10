document.writeln('hello world!');

/**
    �����ֵ��������(falsy)
    . false
    . null
    . undefined
    . ���ַ���
    . ����0
    . ���� NaN
    �������е�ֵ���������棬�����ַ���"false"

*/

// method�����·���
Function.prototype.method = function (name, func){
    this.prototype[name] = func;
    return this;
}

/**
    ����������
    
    ��Ҫע�����JavaScript��ǿ��Ҫ��������ס��������
    ������סfirst_name��last_name���Ǳ���ģ����������first-name��last-name���Ǳ���ģ���ΪJavaScript�����ӷ�(-)�ǲ��Ϸ��ġ�
*/
var stooge = {
    "first_name" : "Jerome",
    "last_name" : "Howard"
}

document.writeln(stooge.first_name);
document.writeln(stooge["first_name"]);
// ����һ�������ڵĳ�Ա���Ի᷵��undefined
document.writeln(stooge.second_name);

// ������������Ƕ��
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

// ����ʹ��||����������Ĭ��ֵ
document.writeln(stooge.second_name || "(none)");
document.writeln(flight.status || "unkown");

// undefined
document.writeln(flight.equipment);
// throw "TypeError"
// document.writeln(flight.equipment.model)
// ʹ��&&���������"TypeError"
document.writeln(flight.equipment && flight.equipment.model);

document.writeln(flight.departure.IATA);

// ����������������ԣ����»��滻��ǰ��ֵ�����û�и����Ի��������Ե�����
stooge.first_name = "John";
document.writeln(stooge.first_name);
document.writeln("stooge.middle_name is " + stooge.middle_name);
stooge.middle_name = "welcome";
document.writeln("After update. stooge.middle_name is " + stooge.middle_name);

// �����ԭ�����е�����
for(myvar in stooge){
    if(stooge.hasOwnProperty(myvar)){
        document.writeln("for each in stooge property " + myvar + " and value is " + stooge[myvar]);
    }
}

// ����ͨ�����������ݣ�������Զ���ᱻ����
var x = stooge;
x.nickname = "Jacky";
document.writeln("stooge.nickname is " + stooge.nickname);

// ԭ�� Prototype
/** 

    ÿһ���������ӵ�һ��ԭ�Ͷ��󣬲��ҿ��Դ��м̳����ԡ�����ͨ�����������������Ķ������ӵ�Object.prototype������JavaScript�ı������
    ���㴴��һ������ʱ�������ѡ��ĳ��������Ϊ��ԭ�͡�
  
 */
 
 // ��Object����һ��create��������������ʹ��ԭ������Ϊ��ԭ�͵��¶���
 if(typeof Object.beget !== 'function'){
     Object.create = function(o){
         var F = function(){};
         F.prototype = 0;
         return new F();
     }
 }
 
 /** 
 
    ԭ�������ڸ���ʱ�������ã�ֻ���ڼ���ֵ��ʱ��ű��õ���������Ի�ȡ�������ڸö����в����ڣ���ô�����Ŵ�ԭ�Ͷ����л�ȥ����ֵ�����ԭ�Ͷ���û�и����ԣ�
    ��ô�ڴ�����ԭ�Ϳ�ʼ���ң��Դ����ƣ�ֱ���ù������յ���Object.prototype
    ԭ�͹�ϵ�Ƕ�̬��ϵ������������һ���µ����Ե�ԭ���У������Ի����������л��ڸ�ԭ�ʹ����Ķ���ɼ���
    
 */
 
 // �鿴���Ե�����
 document.writeln("stooge.first_name type is " + (typeof stooge.first_name));
 document.writeln("stooge.first_name type is " + (typeof 123456));
 document.writeln("stooge.first_name type is " + (typeof stooge));
 document.writeln("stooge.first_name type is " + (typeof stooge.staus));
 document.writeln("stooge.first_name type is " + (typeof stooge.toString));
 
 // ԭ�����е��κ����Զ������ֵ��һ����˵��ȡ����������Ϣʱ����ע�ĸ��������ݡ����Զ���ֵΪ���������ͻ���ʹ��hasOwnProperty�������������������ԭ������ֻ���������
 
 // ɾ������,delete�����
 var F = function(){};
 F.prototype = stooge;
 var another_stooge = new F();
 stooge.del = "delete operator";
 document.writeln("stooge del property is " + stooge.del);
 delete stooge.del;
 document.writeln("after delete stooge del property is " + stooge.del);
 another_stooge.nickname = "Mode";
 document.writeln("another_stooge.nickname property is " + another_stooge.nickname);
 // another_stoogeҲ������nickname���ԣ�ɾ�������Ի���ԭ�����е�����͸�ֳ���
 delete another_stooge.nickname;
 document.writeln("another_stooge.nickname property is " + another_stooge.nickname);
 
 // ��������
 // û�и����������ĺ�������Ϊ��������
 var add = function (a, b){
     return a + b;
 };
 
 // ��������
 /** 
    
   ÿ�����������������ӵĲ�����this��arguments��
   this��ֵȡ���ڵ��õ�ģʽ����������ģʽ����������ģʽ������������ģʽ��apply����ģʽ
   ʵ�����βεĸ�����ƥ��ʱ���ᵼ������ʱ����ʵ�θ������ˣ������Ĳ���ֵ�ᱻ���ԣ����ʵ�εĸ������ˣ���ôȱʧ�Ĳ������滻Ϊundefin��
   ���Բ��������ͽ��м�飬�κ����͵�ֵ�����Դ��ݡ�

 */
 
 // ��������ģʽ
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
 
 // ��������ģʽ
 // ��һ����������һ�����������ʱ����ô�����Ǳ�����һ�����������ã�
 document.writeln("add function result:" + add(10, 11));
 // �ڴ�ģʽ�£�this���󶨵�ȫ�ֶ����������ʹ���ⲿ��������ʹ���ڲ���������������Ĺ�������Ϊ�ڲ�������thisû�б��󶨵��ⲿ���������С�
 
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
 
 // ����������ģʽ
 var Quo = function (string){
     this.status = string;
 }
 Quo.prototype.get_status = function(){
     return this.status;
 }
 var myQuo = new Quo("confused");
 document.writeln("Quo status is " + myQuo.get_status());
 document.writeln("Quo status is " + Quo.staus);