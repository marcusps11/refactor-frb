jQuery(function($) {

  var ContactCtrl,
  ContactService;

  ContactCtrl = {
    init: function() {
      this.setVars();
      this.bindEvents();
    },

    setVars: function() {
      this.$root = $('.forest-road-content');
      this.$contactForm = this.$root.find('#contact_form');
    },

    bindEvents: function() {
      this.$contactForm.on('submit', this.onContactFormSubmission.bind(this));

    },

    onContactFormSubmission: function(event) {
      var contactObj;
    
      event.preventDefault();

      contactObj = this.serializeFormObj();

      this.sendContactXHR(contactObj);
    },

    serializeFormObj: function() {
      var contactObj = {},
      formDetails;

      event.preventDefault();

      formDetails = this.$contactForm.serializeArray();

      $.each(formDetails, function(index, fieldObj) {
        contactObj[fieldObj.name] = fieldObj.value;
      });

      return contactObj;
    },

    sendContactXHR: function(payload) {
      ContactService.sendContactXHR(payload).then(function(response) {
      }, function(error) {

      });
    }
  };

  ContactService = {
    sendContactXHR: function(payload) {
      var defer = $.Deferred();
      debugger;

      $.ajax({
        type: 'POST',
        url: '/api/sendmessage',
        data: payload
      }).success(function(response) {
        defer.resolve(response);
        console.log('hello')
   
      }).fail(function(error) {
        defer.reject(error);
        console.log(error)
      });

      return defer.promise();
    },
  };

  ContactCtrl.init();

});