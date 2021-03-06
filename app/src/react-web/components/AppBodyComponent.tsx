import * as React from 'react';
import { FullScreenService } from '../FullscreenService';

export interface IAppBodyComponentProps {
	isFullScreen: boolean;
	children?: React.ReactNode;
}

const AppBodyComponent = (props: IAppBodyComponentProps) => (
	<div id="body" style={{
		top: `${FullScreenService.getOffset(props.isFullScreen)}px`,
		height: `calc(100vh - ${FullScreenService.getOffset(props.isFullScreen)}px)`
	}}>
		{props.children}
	</div>
);
export default AppBodyComponent;
