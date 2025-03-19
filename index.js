let AimTrainerGame = {
    gameContainer: document.getElementById("game-container"),
    ball: document.getElementById("ball"),
    accuracyCounter: document.getElementById("accuracy-header"),
    data: {
        ballVelocityX: 1, ballVelocityY: 1, posX: 1, posY: 1,
        ballRadius: 100,
        currentlyPlaying: false,
        game_id: undefined,
        total_time: 1, time_accurate: 1,
        mouseOverBall: false, mouseOverGameContainer: false
    },
    functions: {
        startStop: function() {
            window.addEventListener("keydown", (element) => {
                if(element.key==" ") {
                    AimTrainerGame.data.currentlyPlaying = !AimTrainerGame.data.currentlyPlaying;
                    console.log(AimTrainerGame.data.currentlyPlaying);
                    AimTrainerGame.functions.runGame();
                }
            });
            AimTrainerGame.ball.addEventListener('mouseenter', () => {
                if(AimTrainerGame.data.currentlyPlaying) {
                    AimTrainerGame.data.mouseOverBall = true;
                }
            });
            AimTrainerGame.gameContainer.addEventListener('mouseover', () => {
                if(AimTrainerGame.data.currentlyPlaying) {
                    AimTrainerGame.data.mouseOverGameContainer = true;
                }
            });
            AimTrainerGame.ball.addEventListener('mouseleave', () => {
                if(AimTrainerGame.data.currentlyPlaying) {
                    AimTrainerGame.data.mouseOverBall = false;
                }
            });
            AimTrainerGame.gameContainer.addEventListener('mouseleave', () => {
                if(AimTrainerGame.data.currentlyPlaying) {
                    AimTrainerGame.data.mouseOverGameContainer = false;
                }
            });
        },
        runGame: function() {
            if(AimTrainerGame.data.currentlyPlaying) {
                AimTrainerGame.data.game_id = setInterval(this.draw_game, 10);
            }
            else {
                clearInterval(AimTrainerGame.data.game_id);
                console.log(`Total Time : ${AimTrainerGame.data.total_time}`);
                console.log(`Accurate Time : ${AimTrainerGame.data.time_accurate}`);
                AimTrainerGame.data.ballVelocityX = 2, AimTrainerGame.data.ballVelocityY = 2;
                AimTrainerGame.data.posX = 1, AimTrainerGame.data.posY = 1;
                AimTrainerGame.data.total_time = 1, AimTrainerGame.data.time_accurate = 0;
                AimTrainerGame.data.mouseOverBall = false, AimTrainerGame.mouseOverGameContainer = false;
            }
        },
        draw_game: function() {
            AimTrainerGame.ball.style.left = `${AimTrainerGame.data.posX}px`;
            AimTrainerGame.ball.style.top = `${AimTrainerGame.data.posY}px`;

            if(AimTrainerGame.data.posX + AimTrainerGame.data.ballRadius >= 2000 || AimTrainerGame.data.posX <= 0) {
                AimTrainerGame.data.ballVelocityX *= -1;
            }
            else if(AimTrainerGame.data.posY + AimTrainerGame.data.ballRadius >= 950 || AimTrainerGame.data.posY <= 0) {
                AimTrainerGame.data.ballVelocityY *= -1;
            }

            AimTrainerGame.data.posX += AimTrainerGame.data.ballVelocityX;
            AimTrainerGame.data.posY += AimTrainerGame.data.ballVelocityY;

            if(AimTrainerGame.data.mouseOverGameContainer) {
                AimTrainerGame.data.total_time++;
                if(AimTrainerGame.data.mouseOverBall) {
                    AimTrainerGame.data.time_accurate++;
                }
            }

            if(AimTrainerGame.data.time_accurate%300 == 0 && AimTrainerGame.data.time_accurate >= 300) {
                AimTrainerGame.data.ballVelocityX+=Math.sign(AimTrainerGame.data.ballVelocityX);
                AimTrainerGame.data.ballVelocityY+=Math.sign(AimTrainerGame.data.ballVelocityY);
            }

            let accuracy = AimTrainerGame.data.time_accurate * 100 / AimTrainerGame.data.total_time;
            if(accuracy < 50 && AimTrainerGame.data.time_accurate >= 300) {
                AimTrainerGame.data.currentlyPlaying = false;
                AimTrainerGame.data.time_accurate = 0;
                window.alert(`You made it to Level ${AimTrainerGame.data.ballVelocityX >= AimTrainerGame.data.ballVelocityY ? Math.abs(AimTrainerGame.data.ballVelocityX) : Math.abs(AimTrainerGame.data.ballVelocityY)}!`)
            }
            AimTrainerGame.accuracyCounter.innerHTML = `Accuracy : ${accuracy}%`;
        }
    }
}

AimTrainerGame.functions.startStop();
AimTrainerGame.functions.runGame();