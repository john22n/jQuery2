  $(document).ready(function() {
    var listo = [];
    // if (localStorage.getItem('listo')) {
    //   listo = JSON.parse(localStorage.getItem("listo"))
    // }

    var advanceTask = function(task) {
      var modified = task.innerText.trim();
      console.log(modified);
      for (var i = 0; i < listo.length; i++) {
        if (listo[i].task === modified) {
          if (listo[i].id === 'new') {
            listo[i].id = 'inProgress';
          } else if (listo[i].id === 'inProgress') {
            listo[i].id = 'archived';
          } else {
            listo.splice(i, 1);
          }
          break;
        }
      }
      localStorage.setItem("listo", JSON.stringify(listo))
      task.remove();
    };


    $('#newTaskForm').hide();

    var Task = function(task) {
      this.task = task;
      this.id = 'new';
    }
    var addTask = function(task) {
      if (task) {
        task = new Task(task)
        listo.push(task)
        localStorage.setItem("listo", JSON.stringify(listo))

        $('#newItemInput').val('');
        $('#newList').append(
          '<a href="#finish" class="" id="item">' +
          '<li class="list-group=item">' +
          '<h3>' + task.task + '</h3>' +
          '<span class="arrow pull-right">' +
          '<i class="glyhicon glyphicon-arrow-right">' +
          '</span>' +
          '</li>' +
          '</a>'
        );
      }
      $('#newTaskForm').slideToggle('fast', 'linear');
    };

    $('#saveNewItem').on('click', function(e) {
      e.preventDefault();
      var task = $('#newItemInput').val().trim();
      addTask(task);
    });
    //opens form
    $('#add-todo').on('click', function() {
      $('@newTaskForm').fadeToggle('fast', 'linear');
    });
    //close form
    $('#cancel').on('click', function(e) {
      e.preventDefault();
      $('#newTaskForm').fadeToggle('fast', 'linear');
    });
    $(document).on('click', '#item', function(e) {
      e.preventDefault();
    });

    $(document).on('click', '#item', function(e) {
      e.preventDefault();
      var task = this;
      advanceTask(task);
      this.id = 'inProgress';
    });

    $(document).on('click', '#item', function(e) {
      e.preventDefault();
      var task = this;
      advanceTask(task);
      this.id = 'inProgress';
      $('#currentList').append(this.outerHTML);
    });

    $(document).on('click', '#inProgress', function(e) {
      e.preventDefault();
      var task = this;
      task.id = "archived";
      var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glypicon-remove');
      advanceTask(task);
      $('#archivedList').append(changeIcon);
    });

    $(document).on('click', '#archived', function(e) {
      e.preventDefault();
      var task = this;
      advanceTask(task);
    });





  })
