import Button, { type ButtonProps } from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import List, { type ListProps } from '@mui/material/List'
import ListItem, { type ListItemProps } from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import Stack, { type StackProps } from '@mui/material/Stack'
import Typography, { type TypographyProps } from '@mui/material/Typography'

const Container = (props: ListProps) => (
	<List
		dense
		{...props}
		sx={{
			display: 'grid',
			gridTemplateColumns: 'auto 1fr',
			p: 0,
			m: 0,
			ml: (theme) => ({ xs: theme.spacing(0.5), sm: theme.spacing(1) }),
			mt: (theme) => ({ xs: theme.spacing(0.5), sm: theme.spacing(1) }),
			columnGap: (theme) => ({
				xs: theme.spacing(1),
				sm: theme.spacing(3),
			}),
			...props.sx,
		}}
	/>
)

const Row = (props: ListItemProps) => (
	<ListItem
		{...props}
		sx={{
			display: 'grid',
			gridColumn: 'span 2',
			gridTemplateColumns: 'subgrid',
			m: 0,
			p: 0,
			pl: (theme) => theme.spacing(0.5),
			py: (theme) => theme.spacing(0.5),
			alignItems: 'start',
		}}
	/>
)

const Head = (props: ButtonProps) => {
	return (
		<Button
			variant='text'
			{...props}
			sx={{
				m: 0,
				p: 0,
				textAlign: 'left',
				color: 'text.primary',
				fontWeight: 'normal',
				justifyContent: 'left',
				...props.sx,
			}}
		/>
	)
}

const WrappableStack = (props: StackProps) => (
	<Stack direction='row' flexWrap='wrap' rowGap={0.5} {...props} />
)

const ExampleContainer = (props: StackProps) => (
	<Stack direction='row' alignItems='end' {...props} />
)

const Example = (props: TypographyProps) => (
	<Typography
		variant='body2'
		{...props}
		sx={{
			whiteSpace: 'pre',
			border: 'solid 1px',
			borderColor: (theme) => theme.palette.text.secondary,
			marginRight: '1px',
			...props.sx,
		}}
	/>
)

const Note = (props: TypographyProps) => (
	<Typography
		variant='caption'
		{...props}
		sx={{
			color: (theme) => theme.palette.text.secondary,
			whiteSpace: 'nowrap',
			...props.sx,
		}}
	/>
)

export function QueryExplain() {
	return (
		<Paper>
			<Container>
				<Row>
					<Head>andとして扱われる文字</Head>
					<WrappableStack>
						<ExampleContainer>
							<Example
								sx={{
									paddingLeft: '1px',
									paddingRight: '1px',
								}}
							>
								&
							</Example>
							<Typography sx={{ mr: 1 }}>,</Typography>
						</ExampleContainer>
						<ExampleContainer>
							<Example>{'　'}</Example>
							<Note>(全角スペース)</Note>
							<Typography sx={{ mr: 1 }}>,</Typography>
						</ExampleContainer>
						<ExampleContainer>
							<Example>。</Example>
						</ExampleContainer>
					</WrappableStack>
				</Row>
				<Divider sx={{ gridColumn: 'span 2' }} />
				<Row>
					<Head>orとして扱われる文字</Head>
					<WrappableStack>
						<ExampleContainer>
							<Example
								sx={{
									paddingLeft: '2px',
									paddingRight: '2px',
								}}
							>
								|
							</Example>
							<Note>(パイプ)</Note>
							<Typography sx={{ mr: 1 }}>,</Typography>
						</ExampleContainer>
						<ExampleContainer>
							<Example sx={{ px: '2px' }}>,</Example>
							<Note>(コンマ)</Note>
							<Typography sx={{ mr: 1 }}>,</Typography>
						</ExampleContainer>
						<ExampleContainer>
							<Example>、</Example>
							<Note>(全角読点)</Note>
						</ExampleContainer>
					</WrappableStack>
				</Row>
			</Container>
		</Paper>
	)
}
