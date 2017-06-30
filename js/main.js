    var imageCanvas = document.getElementById('imageCanvas');
    var ctx = imageCanvas.getContext('2d');

    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Enter a seed, and press Generate", 360, 150);

    function GenerateQR() {
        var qrCanvas = document.getElementById('qr');
        var seed = document.getElementById('seed').value;

        var qr = new QRious({
            element: qrCanvas,
            value: seed,
            size: 250,
            backgroundAlpha: 0
        });

        validAdd = DisplayValid(seed);

        if (validAdd) {
            ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

            var bg = new Image;
            bg.onload = function() {
                ctx.save();
                ctx.globalAlpha = 0.8;
                ctx.drawImage(bg, 0, 0, imageCanvas.width, imageCanvas.height);
                ctx.restore();
                ctx.drawImage(qrCanvas, 0, 0);

                ctx.font = "bold 12.3px Roboto";
                ctx.textAlign = "left";

                ctx.fillText(seed, 10, 260);

                ctx.save();
                ctx.translate(728, 260);
                ctx.rotate(3 * Math.PI / 2);
                ctx.font = "bold 15.3px Roboto";
                ctx.fillStyle = "#000000";
                ctx.textAlign = "left";
                ctx.fillText("IOTA IOTA IOTA IOTA IOTA IOTA", 0, 0);
                ctx.restore();

                var img = new Image;
                img.onload = function() {
                    ctx.drawImage(img, 275, 50, 400, 150);
                };
                img.src = "img/logo.png";
            };
            bg.src = "img/bg.png";
        } else {
            ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
            ctx.font = "14px Arial";
            ctx.textAlign = "center";
            ctx.fillText(msg, 360, 150);
        }
    }

    function DisplayValid(seed) {
        msg = ""
        document.getElementById('validMessage').innerHTML = "";
        var val = true;
        if (seed == "" || seed.length > 81) {
            msg = "This is not a valid seed!";
            val = false;
        }
        if (seed.length < 81 && seed != "") {
            msg = "This seed is less than 81 characters. For maximum security, use 81 characters.";
            document.getElementById('validMessage').innerHTML = msg;
        }
        return val;
    }

    function PrintWallet() {
        window.print();
    }