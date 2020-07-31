
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
        inputBtn : '.add__btn',
        incomeContainer : '.income__list',
        expenseContainer : '.expenses__list'
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
            var html, newHtml;
            
            if(type === "inc"){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="expense-0"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if (type =="exp" ){
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="expense-0"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.ID);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            },
        clearFields: function(){
            var fields, fieldsArr;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', '+ DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });

            fieldsArr[0].focus();
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
        UICtrl.addListItem(newItem, input.type);

        UICtrl.clearFields();
    };

    return {
        init: function(){
            console.log("application has started");
            setupEventListeners();
        }
    };

})(budgetController, UIController);



controller.init();