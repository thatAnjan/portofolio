import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Link from 'components/Links/MuiLink'
import { nanoid } from 'nanoid'

import navigationOptions, {
	Option,
} from 'components/Navigation/navigationOptions'

function a11yProps(index: number) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	}
}

const FullWidthTabs = () => {
	const [value, setValue] = React.useState(0)

	const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Tabs
			value={value}
			indicatorColor='primary'
			onChange={handleChange}
			textColor='primary'
			variant='fullWidth'
			aria-label='full width tabs example'
			orientation='horizontal'
		>
			{navigationOptions.map(({ href, label }: Option, index: number) => (
				<Link
					key={nanoid()}
					href={href}
					MuiComponent={Tab}
					label={label}
					{...a11yProps(index)}
				/>
			))}
		</Tabs>
	)
}

export default FullWidthTabs