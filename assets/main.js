var requester_data = {};
var user_id;

(function () {
  var client = ZAFClient.init();
  client.invoke('resize', { width: '100%', height: '250px' });

  client.get('ticket.requester.id').then(
    function(data) {
      console.log("User ID obtained from Zendesk:", data['ticket.requester.id']);
      user_id = data['ticket.requester.id']; // Assigning user_id obtained from Zendesk
      console.log("Assigned user_id:", user_id); // Log the assigned user_id
      requestUserInfo(client, user_id);
    }
  );  
})();

function requestUserInfo(client, id) {
  var settings = {
    url: '/api/v2/users/' + id + '.json',
    type:'GET',
    dataType: 'json',
  };

  client.request(settings).then(
    function(data) {
      showInfo(data);
    },
    function(response) {
      showError(response);
    }
  );
}

function getUserProStatus(username) {
  var mixcloudUrl = 'https://api.mixcloud.com/' + username + '/';

  return fetch(mixcloudUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function(data) {
      return data.is_pro; // Return the value of is_pro
    })
    .catch(function(error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-throw the error to propagate it further
    });
}

function getUser2ProStatus(username_2) {
  var mixcloudUrl = 'https://api.mixcloud.com/' + username_2 + '/';

  return fetch(mixcloudUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function(data) {
      return data.is_pro; // Return the value of is_pro
    })
    .catch(function(error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-throw the error to propagate it further
    });
}

function getUser3ProStatus(username_3) {
  var mixcloudUrl = 'https://api.mixcloud.com/' + username_3 + '/';

  return fetch(mixcloudUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function(data) {
      return data.is_pro; // Return the value of is_pro
    })
    .catch(function(error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-throw the error to propagate it further
    });
}

function getUserPremiumStatus(username) {
  var mixcloudUrl = 'https://api.mixcloud.com/' + username + '/';

  return fetch(mixcloudUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function(data) {
      return data.is_premium; // Return the value of is_premium
    })
    .catch(function(error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-throw the error to propagate it further
    });
}

function getUser2PremiumStatus(username_2) {
  var mixcloudUrl = 'https://api.mixcloud.com/' + username_2 + '/';

  return fetch(mixcloudUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function(data) {
      return data.is_premium; // Return the value of is_premium
    })
    .catch(function(error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-throw the error to propagate it further
    });
}

function getUser3PremiumStatus(username_3) {
  var mixcloudUrl = 'https://api.mixcloud.com/' + username_3 + '/';

  return fetch(mixcloudUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function(data) {
      return data.is_premium; // Return the value of is_premium
    })
    .catch(function(error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-throw the error to propagate it further
    });
}

function getUserUrl(username) {
  var mixcloudUrl = 'https://api.mixcloud.com/' + username + '/';
  return fetch(mixcloudUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(function(data) {
      return data.url; // Return the user URL
    })
    .catch(function(error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error; // Re-throw the error to propagate it further
    });
}

function showInfo(data) {
  var requester_data = {
    'name': data.user.name,
    'tags': data.user.tags,
    'created_at': formatDate(data.user.created_at),
    'last_login_at': formatDate(data.user.last_login_at),
    'details': data.user.details.trim(),
    'username': data.user.user_fields.username,
    'username_2': data.user.user_fields.username_2,
    'username_3': data.user.user_fields.username_3
  };

  // Call getUserProStatus and getUserPremiumStatus functions to get the status
  Promise.all([
    getUserProStatus(requester_data.username),
    getUserPremiumStatus(requester_data.username),
    getUser2ProStatus(requester_data.username_2),
    getUser2PremiumStatus(requester_data.username_2),
    getUser3ProStatus(requester_data.username_3),
    getUser3PremiumStatus(requester_data.username_3),
    getUserUrl(requester_data.username), // Get user URL
    getUserUrl(requester_data.username_2), // Get user URL for username_2
    getUserUrl(requester_data.username_3) // Get user URL for username_3
  ]).then(function(statuses) {
    requester_data.isPro = statuses[0]; // Assign the returned value to isPro property
    requester_data.isPremium = statuses[1]; // Assign the returned value to isPremium property
    requester_data.isPro_2 = statuses[2]; // Assign the returned value to isPro property
    requester_data.isPremium_2 = statuses[3]; // Assign the returned value to isPremium property
    requester_data.isPro_3 = statuses[4]; // Assign the returned value to isPro property
    requester_data.isPremium_3 = statuses[5]; // Assign the returned value to isPremium property
    requester_data.userUrl = statuses[6]; // Assign the returned value to userUrl property
    requester_data.userUrl_2 = statuses[7]; // Assign the returned value to userUrl property
    requester_data.userUrl_3 = statuses[8]; // Assign the returned value to userUrl property

    var source = document.getElementById("requester-template").innerHTML;
    var template = Handlebars.compile(source);
    var html = template(requester_data);
    document.getElementById("content").innerHTML = html;
  }).catch(function(error) {
    console.error('Error getting status:', error);
    // Handle error if necessary
  });
}


function showError(response) {
  var error_data = {
    'status': response.status,
    'statusText': response.statusText
  };

  var source = document.getElementById("error-template").innerHTML;
  var template = Handlebars.compile(source);
  var html = template(error_data);
  document.getElementById("content").innerHTML = html;
}

function formatDate(date) {
  var cdate = new Date(date);
  var options = {
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  date = cdate.toLocaleDateString("en-us", options);
  return date;
}

document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM content loaded");
  var client = ZAFClient.init();

  var usernameInput = document.getElementById("username");
  var username2Input = document.getElementById("username_2");
  var username3Input = document.getElementById("username_3");

  if (usernameInput) {
    usernameInput.addEventListener("change", function () {
      console.log("Username input changed");
      updateUserField(client, user_id, 'username', this.value);
    });
  }  
  
  if (username2Input) {
    username2Input.addEventListener("change", function () {
      console.log("Username input changed");
      updateUserField(client, user_id, 'username_2', this.value);
    });
  }
  
  if (username3Input) {
    username3Input.addEventListener("change", function () {
      console.log("Username input changed");
      updateUserField(client, user_id, 'username_3', this.value);
    });
  }
  
  function updateUserField(client, userId, username, value) {
    var settings = {
      url: '/api/v2/users/' + userId + '.json',
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({
        'user': {
          'user_fields': {
            [username]: value
          }
        }
      })
    };
  
    console.log("Updating user field:", username, "with value:", value);
    console.log("User ID received:", userId); // Log the received user_id
  
    client.request(settings).then(
      function (data) {
        console.log(username + ' field updated successfully for user ' + userId);
      },
      function (response) {
        console.error('Error updating ' + username + ' field for user ' + userId + ':', response);
      }
    );
  }   

});
