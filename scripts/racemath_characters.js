Quintus.RacemathCharacter = function(Q){
    Q.Sprite.extend("Rival", {
        init: function(p){
            this._super(p, {
                type: Q.SPRITE_RACER,
                collisionMask: Q.SPRITE_OTHER
            });
            this.add("2d");
            this.p.vx = 60 + Math.random() * 40;
        }
    });

    Q.Sprite.extend("Player", {
        init: function(p){
            this._super(p, {
                type: Q.SPRITE_RACER,
                collisionMask: Q.SPRITE_OTHER,
                sheet: "player"
            });
            this.add("2d");
            
        }
    });

    Q.Sprite.extend("Princess", {
        init: function(p){
            this._super(p, {
                type: Q.SPRITE_OTHER,
                collisionMask: Q.SPRITE_OTHER,
                sheet: "girl"
            });
            this.add("2d");
            
            this.on("hit", function(collision){
                //console.log(collision.obj);
                if(collision.obj.isA("Player")){
                    //console.log("You won");
                    Q.stageScene("game_over", 1, {label: "You Won !"});
                    this.destroy();
                }
                else if (collision.obj.isA("Rival")){
                    //console.log("You lose");
                    Q.stageScene("game_over", 1, {label: "Game Over !"});
                    this.destroy();
                }
            });
        }
    });

}