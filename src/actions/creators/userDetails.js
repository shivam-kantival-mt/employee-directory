
import {
	ADD_USER,
	LOADED_DETAILS,
	LOADING_DETAILS,
  ERROR_WHILE_LOADING,
  UPDATE_USER,
} from "../reducers";

export function loadingDetails() {
	return {
		type: LOADING_DETAILS,
	};
}

export function loadedDetails(data) {
	return {
		type: LOADED_DETAILS,
		payload: data,
	};
}

export function addUser(userData) {
	return {
		type: ADD_USER,
		payload: userData,
	};
}

export function errorLoadingAction() {
	return {
		type: ERROR_WHILE_LOADING,
	};
}

export function updateUserAction(data) {
	return {
		type: UPDATE_USER,
		payload: data,
	};
}
