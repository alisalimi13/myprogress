// In The Name Of Allah

var RootV = new Vue({
	el: '#root',
	data: {
		isReady: false,
		database: {
			progresser: null,
			directions: [],
			progresses: []
		},
	},
	methods: {
		start: function(){
			$('#enter-modal').modal()
			return;
		},
		getDirection: function(id){
			for(direction of this.database.directions)
				if (direction.id == id)
					return direction;
		}
	}
});

var GroundV = new Vue({
	el: '#ground'
});

var HeaderV = new Vue({
	el: '#header',
	methods: {
		newDirection: function(){
			$('#new-direction-modal').modal();
			return;
		},
		newProgress: function(){
			$('#new-progress-modal').modal();
			return;
		},
		downloadDatabase: function(){
			aa_download(JSON.stringify(RootV.database), 'MyProgressDatabase.json', 'application/json');
			return;
		}
	}
});

var SectionV = new Vue({
	el: '#section',
});

var LastProgressV = new Vue({
	el: '#last-progress',
});

var NewDirectionModalV = new Vue({
	el: '#new-direction-modal',
	data: {
		el: '#new-direction-modal',
		title: null,
		nop: null,
	},
	methods: {
		nullV: function(){
			this.title = null;
			this.nop = null;
			return;
		},
		add: function(){
			direction = {
				id: RootV.database.directions.length + 1,
				title: this.title,
				nop: this.nop,
				reach: 0
			};
			direction = aa_clone(direction);
			RootV.database.directions.push(direction);
			$(this.el).modal('hide');
			this.nullV();
			return;
		},
		cancel: function(){
			$(this.el).modal('hide');
			this.nullV();
			return;
		}
	}
});

var NewProgressModalV = new Vue({
	el: '#new-progress-modal',
	data: {
		el: '#new-progress-modal',
		progress: {
				id: null,
				steps: [{
				in_direction: null,
				number: null,
				}],
				comment: null
			}
	},
	methods: {
		nullV: function(){
			this.progress = {
				id: null,
				steps: []
			};
			return;
		},
		addStep: function(){
			new_step = {
				in_direction: null,
				number: null,
			};
			this.progress.steps.push(new_step);
			return;
		},
		submit: function(){
			this.progress.id = RootV.database.progresses.length + 1;
			for (step of this.progress.steps){
				direction = RootV.getDirection(step.in_direction);
				direction.reach += step.number;
			}
			RootV.database.progresses.push(aa_clone(this.progress))
			$(this.el).modal('hide');
			this.nullV();
			return;
		},
		cancel: function(){
			$(this.el).modal('hide');
			this.nullV();
			return;
		}
	}
});

var EnterModalV = new Vue({
	el: '#enter-modal',
	data: {
		el: '#enter-modal',
		type: null,
		defualt_database: {
			progresser: null,
			directions: [],
			progresses: []
		},
		loaded_database: null
	},
	nullV: function(){
		this.type = null;
		this.defualt_database = {
			progresser: null,
			directions: [],
			progresses: []
		};
		this.loaded_database = null;
		return;
	},
	methods: {
		fileInput: function(event){
			var reader = new FileReader();
			reader.readAsText(event.target.files[0]);
			reader.onload = function(e) {
				EnterModalV.loaded_database = JSON.parse(this.result);
			};
			return;
		},
		enter: function(){
			if (this.type == 'new'){
				RootV.database = this.defualt_database;
				RootV.isReady = true;
			}
			else if (this.type == 'open'){
				RootV.database = this.loaded_database;
				RootV.isReady = true;
			}
			$(this.el).modal('hide');
			return;
		}
	}
});

RootV.start()