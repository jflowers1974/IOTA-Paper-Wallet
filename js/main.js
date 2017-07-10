document.addEventListener("DOMContentLoaded", function(event) {
    var iota = new IOTA({
        // Host and provider are only needed if the user intends to generate the address deterministically
        'host': 'http://localhost',
        'port': 14265
    })

    var imageCanvas = document.getElementById('imageCanvas');
    var ctx = imageCanvas.getContext('2d');
    var seedCanvas;
    var addressCanvas;
    var seed;
    var address;
    var qr;

    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Enter a seed, and press Generate", 400, 150);

    function GenerateQR() {
        seed = document.getElementById('seed').value;

        seedCanvas = document.getElementById('seedCanvas');
        addressCanvas = document.getElementById('addressCanvas');

        var options = {};
        options.index = 0;
        options.security = 2;
        options.deterministic = "off";
        options.checksum = true;
        options.total = 1;
        validAdd = DisplayValid(seed);
        console.log(validAdd);
        if (validAdd) {
            iota.api.getNewAddress(seed, options, function(e, add) {
                address = add;
                GeneratePaper();
            });
        } else {
            ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
            ctx.font = "14px Arial";
            ctx.textAlign = "center";
            ctx.fillText(msg, 360, 150);
        }
    }


    function GeneratePaper() {


        if (validAdd) {

            sQR = new QRious({
                element: seedCanvas,
                value: seed,
                size: 150,
                backgroundAlpha: 0
            });

            aQR = new QRious({
                element: addressCanvas,
                value: address[0],
                size: 150,
                backgroundAlpha: 0
            });

            ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

            var bg = new Image;
            bg.onload = function() {
                ctx.save();
                ctx.globalAlpha = 0.8;
                ctx.drawImage(bg, 0, 0, imageCanvas.width, imageCanvas.height);
                ctx.restore();
                ctx.drawImage(seedCanvas, 10, 30);
                ctx.drawImage(addressCanvas, 640, 90);

                ctx.font = "bold 16px Roboto";
                ctx.textAlign = "center";
                ctx.fillText("PRIVATE SEED", 85, 200);

                ctx.font = "bold 12.3px Roboto";
                ctx.textAlign = "left";
                ctx.fillText(seed, 10, 20);

                ctx.textAlign = "center";
                ctx.font = "bold 14px Roboto";
                ctx.fillText("RECEIVING ADDRESS", 715, 80);

                ctx.textAlign = "right";
                ctx.font = "bold 12.3px Roboto";
                ctx.fillText(address, 790, 260);


                ctx.textAlign = "left";
                ctx.save();
                ctx.translate(780, 260);
                ctx.rotate(3 * Math.PI / 2);
                ctx.font = "bold 15.3px Roboto";
                ctx.fillStyle = "#000000";
                ctx.textAlign = "left";
                //ctx.fillText("IOTA IOTA IOTA IOTA IOTA IOTA", 0, 0);
                ctx.restore();

                var img = new Image;
                img.onload = function() {
                    ctx.drawImage(img, 200, 57, 400, 150);
                };
                img.src = "img/logo.png";
            };
            bg.src = "img/bg.png";
        }
    }

    function DisplayValid(seed) {
        msg = ""
        document.getElementById('validMessage').innerHTML = "";
        var val = true;

        if (seed == "" || seed.length > 81 || !seed.match(/^[A-Z9]*$/)) {
            msg = "This is not a valid seed!";
            document.getElementById('validMessage').innerHTML = msg;

            val = false;
        } else if (seed.length < 81 && seed != "") {
            msg = "This seed is less than 81 characters. For maximum security, use 81 characters.";
            document.getElementById('validMessage').innerHTML = msg;
        }
        return val;
    }

    function PrintWallet() {
        window.print();
    }

    document.getElementById("generate").addEventListener("click", GenerateQR);
    document.getElementById("print").addEventListener("click", PrintWallet);
});