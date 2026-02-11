//set initial count
let count = 0;

// select value and buttons

const value = document.querySelector('#value');
const btns = document.querySelectorAll(".btn");

//console.log(btns);

btns.forEach(function (btn) {
    //console.log(btn);
    //e is standing for event
    btn.addEventListener('click', function(e){
        const styles = e.currentTarget.classList;
        if(styles.contains('decrease')){
            count--;
        } else if(styles.contains('increase')){
            count++;
        } else{
            //cheating cause there's only three, so assuming it's reset
            count = 0;
        }

        //maybe could make like a gradient color, tho probably couldn't do just a bunch of if statements for that
        if(count > 0){
            value.style.color = 'green';
        }
        if(count < 0){
            value.style.color = 'red';
        }
        if(count === 0){
            value.style.color = '#222';
        }
        value.textContent = count;
    });
});