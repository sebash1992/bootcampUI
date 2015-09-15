 var Social = function () {};

            Social.prototype = {

                share: function (personToShare) {
                    console.log( "Shared " + this.attributes["title"] + " with " + personToShare);

                },
                like: function () {
                    console.log( "you like that video" );
                },
            }

        function mix( receptor, donor ) {

                // solo extendemos los metodos que pasamos por parametros
                if ( arguments[2] ) {
                    for ( var i = 2, len = arguments.length; i < len; i++ ) {
                    receptor.prototype[arguments[i]] = donor.prototype[arguments[i]];
                    }
                }
                // extendemos todos los metodos
                else {
                    for ( var nombreMetodo in donor.prototype ) {
                    // comprobamos que ya no existiese un metodo llamado igual
                        if ( !receptor.prototype[nombreMetodo] ) {
                        receptor.prototype[nombreMetodo] = donor.prototype[nombreMetodo];
                        }
                    }
                }
        }