import { CircularProgress } from "@material-ui/core";

const Spinner = () => {
	return (
		<div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
			< CircularProgress />
		</div >
	)
};

export default Spinner;
