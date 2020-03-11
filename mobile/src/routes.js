// createAppContainer é navegação q esquece a tela anterior e createSwitchNavigator é navegação de pilhas, um embaixo do outro
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import List from './pages/List';
import Book from './pages/Book';

const Routes = createAppContainer(
	createSwitchNavigator({
		Login,
		List,
		Book
	})
);

export default Routes;
