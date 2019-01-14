import Vue from 'vue';

let instance;
var MyMsg=function(cname,config){

    let MyMsgConstructor = Vue.extend(cname);
 instance= new MyMsgConstructor(config)
    instance.close = function(){
        instance.$el.remove();
    }
instance.$mount();
 document.body.appendChild(instance.$el)
 return instance;
}
export default MyMsg;
