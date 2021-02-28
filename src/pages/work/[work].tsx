import React from 'react'
import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

import ProjectPreview, {
	commonContaienrStyle,
} from 'components/ProjectPreview/ProjectPreview'
import ProjectDescription from 'components/ProjectPreview/ProjectDescription'
import ProjectTechnologies from 'components/ProjectPreview/ProjectTechnologies'
import ApiData from 'apiData/works/dataClass'
import paths from 'utils/paths'
import convertDashToSpace from 'utils/dashToSpace'
import convertSpaceToDash from 'utils/spaceToDash'
import { ifProd } from 'global/variables'

interface Props {
	data: ApiData
}

const useStyles = makeStyles({
	boxStyle: {
		padding: commonContaienrStyle,
	},
})

const Page = ({
	data: {
		name,
		subtitle,
		visitLink,
		description,
		frontEndTechStack,
		backEndTechStack,
		sourceCodeLink,
	},
}: Props) => {
	const projectPreviewProps = {
		name,
		subtitle,
		visitLink,
		description,
		sourceCodeLink,
	}
	const technolgiesProps = { frontEndTechStack, backEndTechStack }
	const pageTitle = convertDashToSpace(name)

	const { boxStyle } = useStyles()

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>

			<Box>
				<ProjectPreview {...projectPreviewProps} />
				<Box className={boxStyle}>
					<ProjectDescription description={description} />
					<ProjectTechnologies {...technolgiesProps} />
				</Box>
			</Box>
		</>
	)
}

export default Page

export const getStaticPaths: GetStaticPaths = async () => {
	return { paths, fallback: false }
}

interface Params {
	params: {
		work: string
	}
}

export const getStaticProps: GetStaticProps = async ({
	params: { work },
}: Params) => {
	const paramId = convertDashToSpace(work)
	console.log(paramId)

	const url = ifProd
		? `${process.env.API_URL}/api/work/${paramId}`
		: `http://localhost:3000/api/work/${paramId}`
	const res = await fetch(url)
	const data = await res.json()

	return { props: { data } }
}
