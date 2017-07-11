import sha256 from "crypto-js/sha256";
import randomToken from "random-token";
randomToken.create("0123456789");

const generateToken = (numbersOnly) => {
	if (numbersOnly) {
		return randomToken(10);
	}

	return `${sha256(`${Math.floor(Math.random() * 1000)  }${  new Date().getTime()}`)  }`;
};

const CryptoService = {
	hash: (value) => {
		return generateToken(value);
	},
};

export default CryptoService;
