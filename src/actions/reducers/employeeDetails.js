//utils
import update from 'immutability-helper';
import _findIndex from 'lodash/findIndex';

//constants
import {
	LOADED_DETAILS,
	LOADING_DETAILS,
	ADD_USER,
  ERROR_WHILE_LOADING,
  UPDATE_USER,
} from "./index";

const initialState = {
	loading: false,
	loaded: false,
	data: [],
};

const getIndexOfSelectedUser = (allUsers, selectedUser = {}) => _findIndex(allUsers, user => user.id === selectedUser.id);

function employeeDetails(state = initialState, action) {
	switch (action.type) {
		case LOADING_DETAILS: {
			return update(state, {
				loading: {
					$set: true,
				},
			});
		}
		case LOADED_DETAILS: {
			return update(state, {
				loading: {
					$set: false,
				},
				loaded: {
					$set: true,
				},
				data: {
					$set: action.payload,
				},
			});
		}

		case ADD_USER: {
			return action.payload ? update(state, {
				data: {
					$push: [action.payload],
				},
			}) : state;
		}

		case ERROR_WHILE_LOADING: {
			return update(state, {
				loading: {
					$set: false,
				},
			});
		}

		case UPDATE_USER: {

			const updatedUser = action.payload,
				indexOfUserInPresentState = getIndexOfSelectedUser(state.data, updatedUser);
			if (indexOfUserInPresentState !== -1) {
				return update(state, {
					data: {
						$splice: [[indexOfUserInPresentState, 1, updatedUser]],
					},
				});
			}
			return state;
		}
		default: return state;
	}
}

export default employeeDetails;
