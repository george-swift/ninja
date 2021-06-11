const defyPhysics = (platform1, platform2) => {
  [platform1, platform2].forEach((platform) => {
    platform.body.allowGravity = false;
    platform.setImmovable(true);
  });
};

const reverseMotion = (platform1, platform2) => {
  if (platform1.y >= 250) {
    platform1.setVelocityY(-90);
  } else if (platform1.y <= 150) {
    platform1.setVelocityY(85);
  }

  if (platform2.x >= 600) {
    platform2.setVelocityX(-100);
  } else if (platform2.x <= 225) {
    platform2.setVelocityX(85);
  }
};

export {
  defyPhysics,
  reverseMotion,
};