const User = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatar = async (req, res, next) => {
	const { _id } = req.user;

	const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

	try {
		const { path: tempDir, originalname } = req.file;
		const [extention] = originalname.split(".").reverse();
		const avatarName = `${_id}.${extention}`;
		const uploadDir = path.join(avatarsDir, avatarName);

		const img = await Jimp.read(tempDir);
		await img.resize(250, 250).writeAsync(uploadDir);
		await fs.unlink(req.file.path);

		const avatarURL = path.join("avatars", avatarName);
		await User.findByIdAndUpdate(_id, { avatarURL });
		res.json({ avatarURL });
	} catch (error) {
		fs.unlink(req.file.path);
		next(error);
	}
};

module.exports = avatar;
