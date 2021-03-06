Math.TO_RAD = Math.PI / 180, Math.getAngle = function(a, b, c, d) {
    var e = a - c,
        f = b - d;
    return Math.atan2(f, e)
}, Math.getDegree = function(a, b, c, d) {
    var e = Math.getAngle(a, b, c, d);
    return e / Math.TO_RAD
}, Math.randMinMax = function(a, b, c) {
    var d = a + Math.random() * (b - a);
    return c && (d = Math.round(d)), d
};
var game = game || {};
! function(a, b) {
    function c() {
        var a = i.createLinearGradient(0, b.WALL_HEIGHT, 0, b.HEIGHT),
            c = i.createLinearGradient(0, 0, 0, b.WALL_HEIGHT);
        a.addColorStop(0, "#5d5c4f"), a.addColorStop(1, "#747362"), c.addColorStop(0, "#838678"), c.addColorStop(.33, "#929585"), c.addColorStop(.33, "#676b52"), c.addColorStop(.66, "#676b52"), c.addColorStop(.66, "#545743"), c.addColorStop(.68, "#929585"), c.addColorStop(1, "#838678"), b.gradients = {
            shadow: a,
            wall: c
        }
    }

    function d() {
        c(), b.setSpeed(b.MIN_SPEED), b.addToWorld(new Background);
        for (var a = 0, d = 3; d > a; a += 1) b.walls[a] = new Wall({
            x: b.WIDTH + b.WIDTH * a,
            width: b.WIDTH
        }), b.addToWorld(b.walls[a]), b.lastWallX = b.walls[a].x;
        b.addToWorld(new Light), b.addToWorld(g = new Player({
            x: 200,
            y: b.HEIGHT - 60
        })), f("#game").addEventListener("mousedown", function() {
            g.jump()
        }), e()
    }

    function e() {
        var a = new Date,
            c = (a - j) / 1e3,
            d = k.length,
            f = 0;
        for (b.distance += c * b.speed, b.speed !== b.targetSpeed && (b.speed += (b.targetSpeed - b.speed) * b.acceleration), h.width = b.WIDTH; d > f; f += 1) k[f].update(c), k[f].draw(i);
        j = a, requestAnimFrame(e)
    }

    function f(a) {
        return document.querySelector(a)
    }
    a.requestAnimFrame = function() {
        return a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(b) {
            a.setTimeout(b, 1e3 / 60)
        }
    }();
    var g, h = document.getElementById("game"),
        i = h.getContext("2d"),
        j = new Date,
        k = [];
    b.init = function() {
        b.WIDTH = h.width, b.HEIGHT = h.height, b.WALL_HEIGHT = b.HEIGHT - 75, b.GRAVITY = 25, b.MIN_SPEED = 100, b.MAX_SPEED = 1100, b.MIN_WALL_WIDTH = 60, b.MAX_WALL_WIDTH = b.WIDTH, b.MAX_JUMPS = 12, b.NADE_INCREASE = 100, b.JUMP_INCREASE = 300, b.score = 0, b.highscore = 0, b.jumps = 0, b.distance = 0, b.speed = 0, b.targetSpeed = 0, b.acceleration = .05, b.walls = [], b.gradients = {}, b.lastWallX = 0, f("#title").addEventListener("mousedown", function() {
            this.classList.add("hidden"), d()
        })
    }, b.addToWorld = function(a) {
        k.push(a)
    }, b.setSpeed = function(a, c) {
        a > b.MAX_SPEED && (a = b.MAX_SPEED), b.targetSpeed = a, b.acceleration = c || b.acceleration
    }, b.setJumps = function(a) {
        b.jumps = a, f("#jumps").innerHTML = a, b.jumps < b.MAX_JUMPS && b.resizeWalls()
    }, b.setScore = function(a) {
        var c = a - b.score;
        c > 0 && (c = "+" + c), b.score = a, f("#score").innerHTML = a, f("#increase").style.top = g.y - 80 + "px", f("#increase").innerHTML = '<div class="ding">' + c + "</div>"
    }, b.setHighscore = function(c) {
        b.highscore = c, f("#highscore").innerHTML = c, f("#newhighscore").classList.add("visible"), a.setTimeout(function() {
            f("#newhighscore").classList.remove("visible")
        }, 1500)
    }, b.resizeWalls = function() {
        for (var a = b.MIN_WALL_WIDTH + (1 - b.jumps / b.MAX_JUMPS) * (b.MAX_WALL_WIDTH - b.MIN_WALL_WIDTH), c = 0, d = b.walls.length; d > c; c += 1) b.walls[c].resize(a)
    }, b.renderToCanvas = function(a, b, c, d) {
        var e = document.createElement("canvas");
        return "undefined" == typeof d && (d = {}), e.width = a, e.height = b, c.call(d, e.getContext("2d")), e
    }
}(window, game),
function(a, b) {
    function c(a) {
        this.x = a.x, this.width = a.width, this.targetWidth = a.width
    }
    c.prototype = {
        spawn: function() {
            this.x = b.lastWallX + b.WIDTH, b.speed === b.MAX_SPEED && (this.x -= Math.randMinMax(0, 200)), b.lastWallX = this.x
        },
        resize: function(a) {
            this.targetWidth = a
        },
        update: function() {
            this.width !== this.targetWidth && (this.width += .1 * (this.targetWidth - this.width)), b.distance > this.x + this.width / 2 && this.spawn()
        },
        draw: function(a) {
            var c = this.width,
                d = b.WALL_HEIGHT;
            a.save(), a.translate(this.x - b.distance, 0), a.fillStyle = b.gradients.wall, a.fillRect(-c / 2, 0, c, d), a.restore()
        }
    }, a.Wall = c
}(window, game),
function(a, b, c) {
    function d(a) {
        var b = this;
        return this.img = new Image, this.gun = new Image, this.x = a.x, this.y = e = a.y, this.vx = 0, this.vy = 0, this.degree = 0, this.counter = 0, this.width = 0, this.height = 0, this.gunDegree = 0, this.currentGunDegree = 0, this.isRunning = !0, this.isJumping = !1, this.isLanding = !1, this.img.onload = function() {
            b.width = this.width, b.height = this.height
        }, this.img.src = "https://raw.githubusercontent.com/moshefeit/Jumping-Jumper/master/assets/razor.png", this.gun.src = "https://raw.githubusercontent.com/moshefeit/Jumping-Jumper/master/assets/nader.png", this
    }
    var e;
    d.prototype = {
        setGunDegree: function(a) {
            this.gunDegree = a
        },
        update: function(a) {
            this.counter += 1 * a, this.currentGunDegree !== this.gunDegree && (this.currentGunDegree += .1 * (this.gunDegree - this.currentGunDegree)), this.isJumping && (this.degree += .5, this.degree > 30 && (this.degree = 30), this.vy > 0 && this.y >= c.HEIGHT - 70 && (this.onLanding(), this.setGunDegree(0), this.isLanding = !0, this.isJumping = !1)), this.isLanding && (this.degree += 10, this.degree >= 355 && (this.onLandingEnd(), this.degree = 0, this.isLanding = !1, this.isRunning = !0)), this.vy += c.GRAVITY, this.y += this.vy * a, this.y > e && (this.y = e)
        },
        draw: function(a) {
            var c = this.width,
                d = this.height,
                e = this.x,
                f = this.y + 2.5 * b.sin(8 * this.counter);
            0 >= f - d / 2 && (this.y = d / 2, this.vy = 0), a.save(), a.translate(e, f), a.rotate(this.degree * b.TO_RAD), a.drawImage(this.img, -c / 2, -d / 2, c, d), a.restore(), a.save(), 180 === this.gunDegree ? a.translate(e + 8, f + 15) : a.translate(e - 13, f + 5), a.rotate(this.currentGunDegree * b.TO_RAD), a.drawImage(this.gun, -5, -5), a.restore()
        },
        jump: function() {
            this.isLanding || (this.isRunning ? (this.onJumping(), this.setGunDegree(100), this.vy = -650, this.isJumping = !0, this.isRunning = !1) : this.isJumping && this.inWallBoundaries() && (this.onNading(), this.setGunDegree(180), this.vy = -450))
        },
        inWallBoundaries: function() {
            for (var a = c.distance + this.x, b = 0, d = c.walls.length; d > b; b += 1)
                if (this.y < c.WALL_HEIGHT && a > c.walls[b].x - c.walls[b].width / 2 && a < c.walls[b].x + c.walls[b].width / 2) return !0;
            return !1
        },
        onLanding: function() {},
        onLandingEnd: function() {
            c.score > c.highscore && c.setHighscore(c.score), c.setSpeed(c.MIN_SPEED, .1), c.setScore(0), c.setJumps(0)
        },
        onJumping: function() {
            c.setSpeed(c.JUMP_INCREASE, 1), c.addToWorld(new Explosion({
                x: this.x,
                y: this.y
            }))
        },
        onNading: function() {
            c.addToWorld(new Explosion({
                x: this.x,
                y: this.y
            })), c.setSpeed(c.speed + c.NADE_INCREASE, 1), c.setScore(c.score + 100), c.setJumps(c.jumps + 1)
        }
    }, a.Player = d
}(window, Math, game),
function(a, b, c) {
    function d() {
        e = {
            x: c.WIDTH / 2,
            y: c.HEIGHT / 4
        }
    }
    var e;
    d.prototype = {
        update: function() {},
        draw: function(a) {
            for (var d, f, g, h, i = 0, j = c.walls.length; j > i; i += 1) d = {
                x: c.walls[i].x - c.walls[i].width / 2,
                y: c.WALL_HEIGHT
            }, f = {
                x: c.walls[i].x + c.walls[i].width / 2,
                y: c.WALL_HEIGHT
            }, g = b.getDegree(d.x - c.distance, d.y, e.x, e.y), h = b.getDegree(f.x - c.distance, f.y, e.x, e.y), a.save(), a.translate(-c.distance, 0), a.beginPath(), a.moveTo(d.x, d.y), a.lineTo(f.x, f.y), a.lineTo(f.x + 200 * b.cos(h * b.TO_RAD), f.y + 200 * b.sin(h * b.TO_RAD)), a.lineTo(d.x + 200 * b.cos(g * b.TO_RAD), d.y + 200 * b.sin(g * b.TO_RAD)), a.closePath(), a.fillStyle = c.gradients.shadow, a.fill(), a.restore()
        }
    }, a.Light = d
}(window, Math, game),
function(a) {
    function b(a) {
        this.life = 0, this.x = a.x, this.y = a.y, this.particles = [];
        for (var b = 0; 40 > b; b += 1) this.particles.push({
            parent: this,
            x: this.x,
            y: this.y,
            color: "rgba(255,255,255," + Math.random() + ")",
            speed: Math.randMinMax(100, 300),
            size: Math.randMinMax(2, 10),
            degree: Math.randMinMax(0, 360),
            vd: Math.randMinMax(-30, 0),
            vs: Math.randMinMax(-12, -6)
        });
        return this
    }
    b.prototype = {
        update: function(a) {
            if (this.life += a, !(this.life > .5))
                for (var b, c = 0; 40 > c; c += 1) b = this.particles[c], b.degree += b.vd * a, b.speed += b.vs, b.speed < 0 && (b.speed = 0), b.x += Math.cos(b.degree * Math.TO_RAD) * b.speed * a, b.y += Math.sin(b.degree * Math.TO_RAD) * b.speed * a, b.x -= a * game.speed, b.y > b.parent.y + 20 && (b.degree *= -1)
        },
        draw: function(a) {
            if (!(this.life > .5))
                for (var b, c = 0; 40 > c; c += 1) b = this.particles[c], a.save(), a.translate(b.x, b.y), a.rotate(b.degree * Math.TO_RAD), a.fillStyle = b.color, a.fillRect(-b.size, -b.size, 2 * b.size, 2 * b.size), a.restore()
        }
    }, a.Explosion = b
}(window),
function(a) {
    function b() {
        this.image = function() {
            var a, b, c = game.WIDTH / 12;
            return a = game.renderToCanvas(c, game.HEIGHT, function(a) {
                a.fillStyle = "#383933", a.fillRect(0, 0, c, game.HEIGHT), a.fillStyle = "#2a2b26", a.fillRect(0, 0, 10, game.HEIGHT), a.fillStyle = "#484235", a.fillRect(0, game.HEIGHT - 150, c, 10), a.fillStyle = "#747362", a.fillRect(0, game.HEIGHT - 140, c, 140)
            }), b = game.renderToCanvas(2 * game.WIDTH, game.HEIGHT, function(b) {
                var c = b.createPattern(a, "repeat");
                b.fillStyle = c, b.fillRect(0, 0, 2 * game.WIDTH, game.HEIGHT)
            })
        }()
    }
    b.prototype = {
        update: function() {},
        draw: function(a) {
            var b = game.distance % game.WIDTH / 2;
            a.save(), a.translate(-b, 0), a.drawImage(this.image, 0, 0), a.fill(), a.restore()
        }
    }, a.Background = b
}(window);
game.init();
