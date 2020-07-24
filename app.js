
var budgetController = (function(){
  var Expense = function(id,description,value){
      this.id = id;
      this.description = description;
      this.value = value;
  };

  var Income = function(id,description,value){
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
       allItems:{
        exp: [],
        inc:[]
       },
       totals:{
           exp:0,
           inc:0
       }
  };

  return {
    addItem: function(type,des,val){
        var newItem,ID;
        ID = data.allItems[type][data.allItems[type].lenght-1].id + 1;
        if(type === 'exp'){
            newItem = new Expense(ID,des,val);
        }else if (type === 'inc'){
            newItem = new Income(ID, des, val);
        }

        data.allItems[type].push(newItem);
        return newItem;
    }
  };

})();


var UIController = (function(){

    var DOMstrings = {
        inputType :'.add__type',
        inputDescription : '.add__description',
        inputValue : '.add__value',
        inputBtn : '.add__btn'
    };


    return {
        getInput:function(){
            return{
                type:document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        }, 
        getDOMstring:function(){
            return DOMstrings;
        }
    };
})();


var controller = (function(budgetCtrl,UICtrl){

    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMstring();

        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };
 
    var ctrlAddItem = function(){
        var input = UICtrl.getInput();
        //console.log(input);
    };

    return {
        init: function(){
            console.log("application has started");
            setupEventListeners();
        }
    };

})(budgetController, UIController);


controller.init();