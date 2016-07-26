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

      $.ajax({
        type: 'POST',
        url: '/sendMessage',
        data: payload
      }).success(function(response) {
        defer.resolve(response);
        // $('#msgInfo').html("<div class='alert alert-success'>");
        // $('#msgInfo > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        // .append("</button>");
        // $('#msgInfo > .alert-success')
        // .append("<strong>Your message has been sent.</strong>");
        // $('#msgInfo > .alert-success')
        // .append('</div>');
        // console.log('Your message has been sent. Thank you!');
        // $("#name").val('');
        // $("#email").val('');
        // $("#msg").val('');
      }).fail(function(error) {
        defer.reject(error);
        // alert('Error sending message.');
        //     $('#msgInfo').html("<div class='alert alert-danger'>");
        //     $('#msgInfo > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        //     .append("</button>");
        //     $('#msgInfo > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please email yo@forestroad.co.uk!");
        //     $('#msgInfo > .alert-danger').append('</div>');
      });

      return defer.promise();
    },
  };

  ContactCtrl.init();

});