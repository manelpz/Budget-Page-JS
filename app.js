
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
        if (data.allItems[type].lenght > 0){
        ID = data.allItems[type][data.allItems[type].lenght-1].id + 1;
        }else{
            ID = 0;
        }
        
        if(type === 'exp'){
            newItem = new Expense(ID,des,val);
        }else if (type === 'inc'){
            newItem = new Income(ID, des, val);
        }

        data.allItems[type].push(newItem);
        return newItem;
    }/*,
    testing: function(){
        console.log(data);
    }*/
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
        addListItem: function(obj, type){
            var html;
            
            if(type === "inc"){
                html = '<div class="item clearfix" id="income-0"><div class="item__description">Salary</div>< class="right clearfix"><div class="item__value">+ 2,100.00</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if (type =="exp" ){
                html = '<div class="item clearfix" id="expense-0"><div class="item__description">Apartment rent</div><div class="right clearfix"><div class="item__value">- 900.00</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                }
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
        var input, newItem;
        input = UICtrl.getInput();
        //console.log(input);
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
    };

    return {
        init: function(){
            console.log("application has started");
            setupEventListeners();
        }
    };

})(budgetController, UIController);



controller.init();