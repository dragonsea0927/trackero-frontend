import { PhotoService } from '@/services/photo-service.js';

export const photoStore = {
	state: {
		photos: [],
		totalPhotos: 0,
		perPage: 9,
	},
	getters: {
        photos(state){
            return state.photos
        }
    },
	mutations: {
		SET_PHOTOS(state, photos) {
			state.photos = photos;
		},
		SET_TOTAL_PHOTOS(state, total) {
			state.totalPhotos = total;
		},
		SET_LOAD_STATE(state, value) {
			state.loadState = value;
		}
	},
	actions: {
		fetchPhotos({ commit, state }) {
			PhotoService.getPhotos()
				.then(response => {
					commit('SET_PHOTOS', response.data);
					commit('SET_TOTAL_PHOTOS', response.headers['x-total']);
				})
				.catch(error => {
					console.log('Error: ' + error.response.data.errors[0]);
				});
		}
	}
};
