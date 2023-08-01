const constant = {
	status: {
		PENDING: "pending",
		PROCESS: "process",
		COMPLETE: "complete",
	},

	coloredDisplay: (status) => {
		switch (status) {
			case constant.status.PENDING:
				return (
					<>
						<span className='inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600'>
							<span className='h-1.5 w-1.5 rounded-full bg-red-600'></span>
							Pending
						</span>
					</>
				);

			case constant.status.PROCESS:
				return (
					<>
						<span className='inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600'>
							<span className='h-1.5 w-1.5 rounded-full bg-yellow-600'></span>
							Process
						</span>
					</>
				);

			default:
				return (
					<>
						<span className='inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600'>
							<span className='h-1.5 w-1.5 rounded-full bg-green-600'></span>
							Complete
						</span>
					</>
				);
		}
	},
};

export default constant;
