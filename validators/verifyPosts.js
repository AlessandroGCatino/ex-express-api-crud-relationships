const { default: isBoolean } = require("validator/lib/isBoolean");

const verifyRequest = {
    title: {
        notEmpty: {
            errorMessage: 'Inserisci il titolo',
            bail: true
        },
        isLength: {
            options: { min: 5},
            errorMessage: 'Il titolo deve essere lungo almeno 5 caratteri',
            bail: true
        },
        isString: {
            errorMessage: 'Il titolo deve essere una stringa'
        }
    },
    slug: {
        notEmpty: {
            errorMessage: 'Inserisci lo slug',
            bail: true
        },
        isLength: {
            options: { min: 5},
            errorMessage: 'Lo slug deve essere lungo almeno 5 caratteri',
            bail: true
        },
        isString: {
            errorMessage: 'Lo slug deve essere una stringa'
        }
    },
    image: {
        notEmpty: {
            errorMessage: "Inserisci l'immagine",
            bail: true
        },
        isLength: {
            options: { min: 5},
            errorMessage: "La stringa dell'immagine deve essere lunga almeno 5 caratteri",
            bail: true
        },
        isString: {
            errorMessage: "L'immagine deve essere una stringa"
        }
    },
    content: {
        notEmpty: {
            errorMessage: "Inserisci il content",
            bail: true
        },
        isLength: {
            options: { min: 1},
            errorMessage: "La stringa del content deve essere lunga almeno 1 carattere",
            bail: true
        },
        isString: {
            errorMessage: "Il content deve essere una stringa"
        }
    },
    published: {
        notEmpty: {
            errorMessage: "Dichiara se il post è pubblicato o meno",
            bail: true
        },
        isBoolean: {
            errorMessage: "Il campo published deve contenere true o false",
        }
    },
    categoryID: {
        in: ["body"],
        notEmpty: {
            errorMessage: "Inserisci l'id della categoria",
            bail: true
        },
        isInt: {
            errorMessage: "L'id della categoria deve essere un intero",
            bail: true
        },
        custom: {
            options: async (catId) => {
                const categoryID = parseInt(catId);
                const category = await Category.findByPk(categoryID);
                if (!category) {
                    throw new Error("La categoria non esiste");
                }
                return true;
            }
        }
    },
    tags: {
        in : ["body"],
        notEmpty: {
            errorMessage: "Inserisci almeno un tag",
            bail: true
        },
        isArray: {
            errorMessage: "Tags deve essere un array",
            bail: true
        },
        custom: {
            options: async (tags) => {
                if(tags.length === 0){
                    throw new Error(`Inserisci almeno un tag`);
                }
                const checkId = tags.find(tagID => isNaN(parseInt(tagID)));

                if(checkId){
                    throw new Error(`Verifica che tutti i tag siano numeri interi`);
                }

                const linkedTags = await prisma.Tag.findMany({
                    where: {
                        id: {
                            in: tags
                        }
                    }
                });
                if (linkedTags.length!== tags.length) {
                    throw new Error("Almeno un tag inserito non esiste");
                }
                return true;
            }
    
        }
    }
}

module.exports = {verifyRequest}

