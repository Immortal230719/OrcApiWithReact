const productHasOwnerId = (owners, userId) => {
  if (Array.isArray(owners)) {
    return owners.some((owner) => owner.id === userId);
  }
  return false;
};

export default productHasOwnerId;
