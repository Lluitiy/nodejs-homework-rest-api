const express = require("express");
const router = express.Router();

const { authorize, validateBody, upload } = require("../../middlewares");

const ctrl = require("../../controllers/user");

const {
	ctrlWrapper,
	userLoginSchema,
	userRegistrationSchema,
	updateSubscriptionSchema,
} = require("../../helpers");

router.post(
	"/register",
	validateBody(userRegistrationSchema),
	ctrlWrapper(ctrl.registerUser)
);

router.post(
	"/login",
	validateBody(userLoginSchema),
	ctrlWrapper(ctrl.loginUser)
);

router.get("/logout", authorize, ctrlWrapper(ctrl.logout));

router.get("/current", authorize, ctrl.getCurrent);

router.patch(
	"/",
	authorize,
	validateBody(updateSubscriptionSchema),
	ctrlWrapper(ctrl.updateSubscription)
);

router.patch("/avatars", authorize, upload.single("avatarURL"), ctrl.avatar);

module.exports = router;
