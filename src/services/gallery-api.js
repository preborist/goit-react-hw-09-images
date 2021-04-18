import axios from 'axios';

const API_KEY = '12798852-7489cd1b3c3d687fea55036ed';

const galleryApi = ({ searchQuery = '', currentPage = 1, pageSize = 12 }) => {
  return axios
    .get(
      `https://pixabay.com/api/?q=${searchQuery}&page=${currentPage}
          &key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${pageSize}`,
    )
    .then(response => response.data.hits);
};

export default galleryApi;
