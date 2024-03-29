function validEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

function validateHuman(honeypot) {
    if (honeypot) {
        console.log("Robot Detected!");
        return true;
    } else {
        console.log("Welcome Human!");
    }
}
function getFormData() {
    var form = document.getElementById("gform");
    var elements = form.elements;
    var fields = Object.keys(elements).map(function(k) {
        if (elements[k].name !== undefined) {
            return elements[k].name;
        } else if (elements[k].length > 0) {
            return elements[k].item(0).name;
        }
    }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
    });
    var data = {};
    fields.forEach(function(k) {
        data[k] = elements[k].value;
        var str = "";
        if (elements[k].type === "checkbox") {
            str = str + elements[k].checked + ", ";
            data[k] = str.slice(0, -2);
        } else if (elements[k].length) {
            for (var i = 0; i < elements[k].length; i++) {
                if (elements[k].item(i).checked) {
                    str = str + elements[k].item(i).value + ", ";
                    data[k] = str.slice(0, -2);
                }
            }
        }
    });
    data.formDataNameOrder = JSON.stringify(fields);
    data.formGoogleSheetName = form.dataset.sheet || "responses";
    data.formGoogleSendEmail = form.dataset.email || "";
    console.log(data);
    return data;
}

function handleFormSubmit(event) {
    event.preventDefault();
    var data = getFormData();

    if (!validEmail(data.email)) {
        document.getElementById('email-invalid').style.display = 'block';
        return false;
    } else {
        var button = document.getElementById("submit");
        button.value = "Gönderiliyor...";
        button.disabled = true;
        var form = event.target;
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log(xhr.status, xhr.statusText);
                    console.log(xhr.responseText);
                    document.getElementById('bildirim').style.display = 'none';
                    document.getElementById('thankyou_message').style.display = 'block';
                } else {
                    console.log('Form submission error:', xhr.status, xhr.statusText);
                }
            }
        };
        var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
    }
}

function loaded() {
    console.log('Contact form submission handler loaded successfully');
    var form = document.getElementById('gform');
    form.addEventListener("submit", handleFormSubmit, false);
}

document.addEventListener('DOMContentLoaded', loaded, false);
