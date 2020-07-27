Quintus.RacemathUI = function(Q){
    Q.UI.Text.extend("QuestionText", {
        init: function(p){
            this._super(p, {
                color: "white",
                x: 0,
                y: 0,
                label: "4x4"
            });

        },
        generate: function(){
            this.p.num1 = Q.state.get("operations_min") + Math.floor(Math.random() * (Q.state.get("operations_max") - Q.state.get("operations_min")));
            this.p.num2 = Q.state.get("operations_min") + Math.floor(Math.random() * (Q.state.get("operations_max") - Q.state.get("operations_min")));
            this.p.label = this.p.num1 + "x" + this.p.num2;
        },
        getAnswer: function(){
            return this.p.num1 * this.p.num2;
        }
    });

    Q.UI.Button.extend("NumberButton", {
        init: function(p){
            this._super(Q._defaults(p, {
                fill: "#FFFFFF",
               
                border: 2,
                shadow: 3,
                shadowColor: "rgba(0,0,0,0.5)",
                w: 40,
                h: 40
            }),
            function(){
                console.log("Button click: " + this.p.label);
                var currentAnswer;
                if(this.p.answerLabel.p.label == ""){
                    currentAnswer = 0;
                }
                else{
                    currentAnswer = +(this.p.answerLabel.p.label);
                }

                if(currentAnswer < 100000){
                    this.p.answerLabel.p.label = "" + (currentAnswer * 10 + +this.p.label);
                }

            });
            
        }
    });
    
    Q.scene("ui", function(stage){
        var qContainer = stage.insert(new Q.UI.Container({
            fill: "gray",
            x: 221,
            y: 325,
            border: 2,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 140,
            h: 50
        }));

        var question = stage.insert(new Q.QuestionText(), qContainer);
        question.generate();

        var answerBox = stage.insert(new Q.UI.Container({
            fill: "#438700",
            x: 221,
            y: 385,
            border: 2,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 140,
            h: 50
        }));

        var answerLabel = answerBox.insert(new Q.UI.Text({
            label: "",
            color: "white",
            x: 0,
            y: 0
        }));

        var answerButton = stage.insert(new Q.UI.Button({
            fill: "white",
            label: "Enter",
            x: 221,
            y: 445,
            border: 2,
            shadow: 3,
            shadowColor: "rgba(0,0,0,0.5)",
            w: 140,
            h: 50
        }, function(){
                console.log("Enter");
                var checkedAnswer = question.getAnswer() == +answerLabel.p.label;
                var player = Q("Player", 0).first();
                if(checkedAnswer){
                    Q.audio.play("win.mp3");
                    player.p.vx = player.p.vx + 10;
                }
                else{
                    Q.audio.play("boom.mp3");
                    player.p.vx = Math.max(0, player.p.vx - 5);
                }
                answerLabel.p.label = "";
                question.generate();
            }
        ));

        var i;
        for(i=1; i < 10; i++){
            stage.insert(
                new Q.NumberButton({
                    label: i,
                    y: 275 + Math.ceil(i/3)*45,
                    x: 30 + parseInt((i + 2) % 3)*45,
                    answerLabel: answerLabel
                })
            );
        }

        stage.insert(
            new Q.NumberButton({
                label: '0',
                y: 275 + 4*45,
                x: 30+45,
                answerLabel: answerLabel
            })
        );
        
    });
    
}