document.addEventListener('DOMContentLoaded', function(){//wait for all the elements on the page(document) to be loaded before execution
    document.querySelector('form textarea').addEventListener('input', function(e){//select the textarea, listen for when the user is type
        let counter = document.querySelector('[data-count]');//select the counter
        /*the dataset is a new HTML feature, 
           when I use data-livinus in my HTML on an element, 
           when I select the element I can access it via dataset.livinus
           this allows you to add abitrary attributes and use them in you javascript without having to manually selecting attribute and reading them
           before now I would do
           document.queryselector('[data-count]').getAtrribute('data-count')
        */
        if(this.value.length > parseInt(counter.dataset.count)){
            document.querySelector('form button').disabled = true;//disable the submit button
        }else{
            document.querySelector('form button').disabled = false;//enable the submit button
            counter.innerHTML = parseInt(counter.dataset.count) -  this.value.length;//set the counter's HTML to the amount of text entered in the textarea - the preset maximum amount of characters, stored in data-count
        }
    })

    document.querySelector('form').addEventListener('submit', function(e){//listen for when the form is being submitted
        e.preventDefault();//stop the form from submitting by itself
        let data = new FormData(this);//this creates an object that will house all the data in the form, with this we dont have to manually select elements and read stuff off them
        this.querySelector('textarea').value = "";//reset form
        this.querySelector('[data-count]').innerHTML = 140;
        let template = document.querySelector('template').content;//select the template, element, this is not rendered on the page, but its content can be used to create dynamic contents on the page
        template.querySelector(`[data-replace='tweet']`).innerHTML = data.get('tweet');//this checks for the field with name 'tweet' in the form and returns its value
        template.querySelector(`[data-replace='handle']`).innerHTML = document.querySelector('[data-handle]').innerHTML;
        let section = document.querySelector('section')//get the section element, this is where all the tweets are
        let lastTweet = section.children[1];//this returns an array of elements inside the section tag, children[0] is the form for tweeting, and children[1] will be the first tweet from the top of the document
        let newTweet = document.importNode(template, true);//this take the template element and turns it into a real element we can use in the document, the argument true makes a deep import, else it would only use <div class="row"></div> and not its children
        section.insertBefore(newTweet, lastTweet);//this inserts newTweet into section but before lastTweet
        //alternatively, u can wrap the tweets inside another section or div, do wrapper.append(newTweet) but you are most likely going to do the above
        //this alternative method is easy and comonly used eventhough the doers admit they wanted to acheive the method I just used
    })

    document.querySelector('[data-handle]').addEventListener('input', function(){//select the tweeter handle, check for input events
        if(!this.innerHTML.length){//if the handle is empty
            document.querySelector('form button').disabled = true;//disable the submit button
        }else{
            document.querySelector('form button').disabled = false;//enable the submit button
        }
    })

})