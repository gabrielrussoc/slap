
const SPACEBAR = 32;
const slapAudio = new Audio('audio/inst-slap.m4a');

class Agent {
    constructor(name) {
        this.name = name;
        this.proteges = new Set();
    }

    addProtege(agent) {
        this.proteges.add(agent);
    }

    protects(agent) {
        return this.proteges.has(agent);
    }
}

class Slap {
    constructor(beater, victim) {
        this.beater = beater;
        this.victim = victim;
    }
}

var slaps;
var agents;

function setup() {
    dog = new Agent('dog');
    boy = new Agent('boy');
    sister = new Agent('sister');

    dog.addProtege(boy);
    boy.addProtege(dog);
    sister.addProtege(boy);
    boy.addProtege(sister);

    agents = [dog, boy, sister];
    slaps = [new Slap(boy, dog)];
}

function newLine() {
    document.getElementById("log").appendChild(document.createElement("hr"));
}

function doStep() {
    next_slaps = [];
    for(slap of slaps) {
        slapAudio.cloneNode().play();
        next_slaps = next_slaps.concat(execute(slap));
    }
    slaps = next_slaps;
    newLine();
}

function log(slapText) {
    var paragraph = document.createElement("p");
    var log = document.createTextNode(slapText);
    paragraph.appendChild(log);
    document.getElementById("log").appendChild(paragraph);
}

function execute(slap) {
    var beater = slap.beater;
    var victim = slap.victim;

    log(beater.name + " hits " + victim.name);

    var triggers = [];
    for(agent of agents) {
        if(agent.protects(victim)) {
            triggers.push(new Slap(agent, beater));
        }
    }
    return triggers;
}

setup();

document.addEventListener('touchstart', function() {
    doStep();
});

document.addEventListener('keypress', function(event) {
    var key = event.keyCode;
    if(key == SPACEBAR) {
        doStep();
    }
});
