document.addEventListener('DOMContentLoaded', function() {
    var addButton = document.getElementById('add-button');
    var dateInput = document.getElementById('date-input');
    var descriptionInput = document.getElementById('description-input');
    var amountInput = document.getElementById('amount-input');
    var typeSelect = document.getElementById('type-select');
    var transactionBody = document.getElementById('transaction-body');
    var currentBalanceElement = document.getElementById('current-balance');
    var transactionIdInput = document.getElementById('transaction-id');
  
    var transactions = [];
    var currentBalance = 0;
  
    addButton.addEventListener('click', function() {
      var transactionId = transactionIdInput.value;
      var date = dateInput.value;
      var description = descriptionInput.value;
      var amount = parseFloat(amountInput.value);
      var type = typeSelect.value;
  
      if (date !== '' && description !== '' && !isNaN(amount) && amount !== 0) {
        if (transactionId !== '') {
          // Update existing transaction
          var index = transactions.findIndex(function(transaction) {
            return transaction.id === transactionId;
          });
  
          if (index > -1) {
            var oldAmount = transactions[index].amount;
            var oldType = transactions[index].type;
            currentBalance -= oldType === 'income' ? oldAmount : -oldAmount;
  
            transactions[index].date = date;
            transactions[index].description = description;
            transactions[index].amount = amount;
            transactions[index].type = type;
  
            var row = transactionBody.children[index];
            row.innerHTML = '<td>' + date + '</td><td>' + description + '</td><td>' + amount.toFixed(2) + '</td><td>' + type + '</td><td><button class="delete-button">Delete</button></td>';
  
            currentBalance += type === 'income' ? amount : -amount;
            currentBalanceElement.textContent = '$' + currentBalance.toFixed(2);
  
            transactionIdInput.value = '';
          }
        } else {
          // Add new transaction
          var transaction = {
            id: 't' + Date.now(),
            date: date,
            description: description,
            amount: amount,
            type: type
          };
  
          transactions.push(transaction);
  
          var row = document.createElement('tr');
            row.innerHTML = '<td>' + date + '</td><td>' + description + '</td><td>' + amount.toFixed(2) + '</td><td>' + type + '</td><td><button class="delete-button">Delete</button></td>';
  
          transactionBody.appendChild(row);
  
          currentBalance += type === 'income' ? amount : -amount;
          currentBalanceElement.textContent = '$' + currentBalance.toFixed(2);
        }
  
        dateInput.value = '';
        descriptionInput.value = '';
        amountInput.value = '';
  
        // Add event listener for the delete button of the newly added/updated transaction
        var deleteButtons = document.getElementsByClassName('delete-button');
        Array.from(deleteButtons).forEach(function(button, index) {
          button.addEventListener('click', function() {
            var transaction = transactions[index];
            if (transaction) {
              transactions.splice(index, 1);
              row.remove();
              currentBalance -= transaction.type === 'income' ? transaction.amount : -transaction.amount;
              currentBalanceElement.textContent = '$' + currentBalance.toFixed(2);
            }
          });
        });
      }
    });
  });
  