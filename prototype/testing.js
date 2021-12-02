var target;
var origin;

function waterblast() {
	// for (let i = 0; i < 30; i++) {
		// We pass the mouse coordinates to the createParticle() function
		waterblast1(origin.getBoundingClientRect().x + origin.getBoundingClientRect().width / 2, origin.getBoundingClientRect().y + origin.getBoundingClientRect().height / 4);
	//}
}

function waterblast1(x, y) {
  // Create a custom particle element
	const particle = document.createElement('particle');
  // Append the element into the body
	document.body.appendChild(particle);
	
	particle.innerHTML = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp";
	particle.style.backgroundColor = "rgb(50, 170, 255)";
	
	const dx = target.getBoundingClientRect().x + target.getBoundingClientRect().width / 2;
	const dy = target.getBoundingClientRect().y + target.getBoundingClientRect().height / 4;
	const animation = particle.animate([
    {
      // Set the origin position of the particle
      // We offset the particle with half its size to center it around the mouse
		transform: `translate(${x}px, ${y}px)`,
		opacity: 1
    },
    {
      // We define the final coordinates as the second keyframe
		transform: `translate(${dx}px, ${dy}px)`,
		opacity: 1
    }
	], {
    // Set a random duration from 500 to 1500ms
		duration: 650,
		easing: 'ease-in',
    // Delay every particle with a random value from 0ms to 200ms
		//delay: Math.random() * 200
	});
	
	animation.onfinish = () => {
		particle.remove();
		 for (let i = 0; i < 30; i++) {
			// We pass the mouse coordinates to the createParticle() function
			waterblast2(dx, dy);
		}
	}
}

function waterblast2(x, y) {
  // Create a custom particle element
	const particle2 = document.createElement('particle');
  // Append the element into the body
	document.body.appendChild(particle2);
	
	particle2.style.width = `16px`;
	particle2.style.height = `16px`;
	particle2.style.backgroundColor = "rgb(50, 170, 255)";
	
	const dx = x + Math.floor(Math.random() * 100);
	const dy = y + Math.floor(Math.random() * 100 - 50);
	const animation = particle2.animate([
    {
      // Set the origin position of the particle
      // We offset the particle with half its size to center it around the mouse
		transform: `translate(${x}px, ${y}px)`,
		opacity: 1
    },
    {
      // We define the final coordinates as the second keyframe
		transform: `translate(${dx}px, ${dy}px)`,
		opacity: 0
    }
	], {
    // Set a random duration from 500 to 1500ms
		duration: 400,
		easing: 'ease-out',
    // Delay every particle with a random value from 0ms to 200ms
		//delay: Math.random() * 200
	});
	
	animation.onfinish = () => {
		particle2.remove()
	}
}

