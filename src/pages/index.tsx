import * as React from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../Link';
import ProTip from '../ProTip';
import Copyright from '../Copyright';
import prisma from '../lib/prisma';
import { Employee } from '@prisma/client'
import EmployeeTable from '../components/EmployeeTable';

type Props = {
  data: Employee[]
}

const Home: NextPage<Props> = ({ data }) => {
  
  React.useEffect(() => {
    console.log(data)
  }, [])

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Empoyee Payroll Management!
        </Typography>
        <EmployeeTable employees={data} />
        <Link mt={2} mb={2} href="/create-employee" color="secondary">
          Create Employee?
        </Link>
        <Copyright />
      </Box>
    </Container>
  );
};


export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const employees = await prisma.employee.findMany()

  // @ts-ignore
  const processed = (employees.map((e) => ({
    ...e,
    startDate: e.startDate.toJSON()
  }))) as Employee[]

  return {
    props: {
      data: processed
    }, // will be passed to the page component as props
  }
}


export default Home;
