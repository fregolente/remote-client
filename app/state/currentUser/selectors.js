
export const isLawyer = (state) => state.user.currentUser.userType.value === 1;
export const isRegularUser = (state) => state.user.currentUser.userType.value === 2;