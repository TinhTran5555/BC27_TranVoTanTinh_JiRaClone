import React, { useEffect } from "react";
import { alpha, Container } from "@mui/system";
import {
  Typography,
  Box,
  styled,
  Chip,
  colors,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
  TextField,
  InputBase,
  Avatar,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../../UI/Display/Loader";
import { useState } from "react";
import EditUser from "../../Components/EditUser";
import DialogUser from "../../Components/DialogUser/DialogUser";
import DialogUserDelete from "../../Components/DialogUser/DialogUserDelete";
import { deleteUserThunk, getAllUserThunk } from "../../slice/userSlice";
import { authSelector, userSelector } from "../../../../app/store";
import useAlert, {
  alertCase,
  initialAlertState,
} from "../../../../app/hooks/alert/useAlert";

const Heading = styled(Box)(({ theme }) => ({
  textAlign: "left",
}));

const TableCellHead = styled(TableCell)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: 700,
  color: colors.blueGrey[700],
  backgroundColor: colors.blueGrey[50],
  borderBottom: `none`,
}));

const TableCellBody = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text,
  borderBottom: `1.5px solid ${colors.blueGrey[50]}`,
}));

const User = () => {
  const [isDialogOpen, setIsDialog] = useState(false);
  const [userPayload, setUserPayload] = useState(null);
  const { alertState, dispatchAlert } = useAlert();

  const dispatch = useDispatch();

  const {
    user,
    isLoading: getLoading,
    error: userError,
  } = useSelector(userSelector);

  const deleteUserHandler = async (id) => {
    try {
      dispatch(deleteUserThunk(id))
        .unwrap()
        .then(() => dispatch(getAllUserThunk()))
        .catch((error) => {
          dispatchAlert({
            type: alertCase.error,
            payload: "The user who created the project cannot be deleted",
          });
        });

      dispatchAlert({
        type: alertCase.success,
        payload: "Delete Successfully",
      });

      // setIsDialog(false)
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(getAllUserThunk());
  }, []);

  const rows = user?.map((row) => {
    const { userId, name, avatar, email, phoneNumber } = row;

    const dialogSettingHandler = (userId, name) => {
      setIsDialog(true);
      setUserPayload({ userId, name });
    };

    return (
      <TableRow
        key={userId}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCellBody>
          <Chip
            color={"info"}
            size="small"
            sx={(theme) => ({
              borderRadius: "4px",
              fontSize: "12px",
            })}
            variant={"outlined"}
            label={`ID: ${userId}`}
          />
        </TableCellBody>
        <TableCellBody
          sx={{
            maxWidth: 160,
          }}
        >
          <Typography variant="subtitle1" fontWeight={700}>
            {name}
          </Typography>
        </TableCellBody>
        <TableCellBody component="th" scope="row">
          <Avatar alt={name} src={avatar} />
        </TableCellBody>

        <TableCellBody component="th" scope="row">
          {email}
        </TableCellBody>
        <TableCellBody
          sx={(theme) => ({
            maxWidth: 200,
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          })}
          align="left"
        >
          {phoneNumber}
        </TableCellBody>
        <TableCellBody align="left">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <EditUser dataFromParent={row} />

            <Button
              onClick={() => {
                dispatchAlert({ type: alertCase.reset });
                dialogSettingHandler(userId, name);
              }}
              color="error"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Box>
        </TableCellBody>
      </TableRow>
    );
  });

  return (
    <Container maxWidth="xl">
      <DialogUser
        onClose={() => setIsDialog(false)}
        isDialogOpen={isDialogOpen}
        label={"Are you sure you want to delete this user?"}
        content={
          alertState.successMessage === "" && alertState.errorMessage === "" ? (
            <DialogUserDelete payload={userPayload} />
          ) : (
            <Typography
              align="center"
              variant="h6"
              component="h2"
              color="green"
              fontWeight={700}
            >
              {`${alertState.successMessage} ${alertState.errorMessage}`}
            </Typography>
          )
        }
        actionError="Cancel"
        actionPrimary="Delete"
        payload={userPayload}
        onControl={() => deleteUserHandler(userPayload.userId)}
      />

      <Grid marginTop={2} container>
        <Grid xs={4}>
          <Heading>
            <Typography fontWeight={700} variant="h5" component="h1">
              User Management
            </Typography>
          </Heading>
        </Grid>
      </Grid>
      {getLoading && <Loader />}
      {!getLoading && (
        <TableContainer
          sx={(theme) => ({
            position: "relative",
            overflowYz: "scroll",
            marginTop: "24px",
            maxHeight: "80vh",
            borderRadius: "4px",
          })}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow
                sx={(theme) => ({
                  backgroundColor: colors.blueGrey[50],
                })}
              >
                <TableCellHead align="left">ID</TableCellHead>
                <TableCellHead align="left">Name</TableCellHead>
                <TableCellHead align="left">Avatar</TableCellHead>
                <TableCellHead align="left">Email</TableCellHead>

                <TableCellHead align="left">Phone Number</TableCellHead>
                <TableCellHead align="left"></TableCellHead>
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default User;
