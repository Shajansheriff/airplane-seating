import {
  Button,
  DataTable,
  Form,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TextInput,
} from 'carbon-components-react';
import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { nanoid } from 'nanoid';
import { useHistory } from 'react-router';
import { isValidTwoDimensionalArray, parseString } from '../../utils/seat-map';
import { useAirplaneStateContext } from '../../store';
import { Airplane } from '../../services/airplane/airplane';

interface ModalMangerProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ModalFormProps {
  open: boolean;
  onSubmit: (data: { name: string; map: any }) => void;
  onCancel: () => void;
}
const ModalForm: React.FC<ModalFormProps> = ({
  open,
  onSubmit,
  onCancel,
}: ModalFormProps) => {
  const [name, setName] = useState('');
  const [map, setMap] = useState('');
  const [isNameInValid, setIsNameInValid] = useState(false);
  const [isMapInValid, setIsMapInValid] = useState(false);

  const clearFormState = () => {
    setName('');
    setMap('');
    setIsNameInValid(false);
    setIsMapInValid(false);
  };

  const handleSubmit = () => {
    const isNameValid = name.length > 0;
    const isMapValid = isValidTwoDimensionalArray(parseString(map));
    if (!isMapValid || !isNameValid) {
      setIsNameInValid(!isNameValid);
      setIsMapInValid(!isMapValid);
    } else {
      clearFormState();
      onSubmit({ name, map });
    }

    // onSubmit({ name, map: parsed });
  };
  const handleClose = () => {
    clearFormState();
    onCancel();
  };
  return (
    <Modal
      modalHeading="Add a airplane"
      primaryButtonText="Add"
      secondaryButtonText="Cancel"
      open={open}
      onRequestClose={handleClose}
      onRequestSubmit={() => handleSubmit()}
    >
      <Form>
        <div style={{ marginBottom: '2rem' }}>
          <TextInput
            data-modal-primary-focus
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            labelText="Airplane name"
            invalidText="Airplane name is required"
            invalid={isNameInValid}
            placeholder="e.g. Airbus 218"
          />
        </div>
        <div style={{ marginBottom: '2rem' }}>
          <TextInput
            data-modal-primary-focus
            id="map"
            required
            invalid={isMapInValid}
            value={map}
            onChange={(e) => setMap(e.target.value || '')}
            labelText="Airplane seat map"
            invalidText="Please enter a valid dimensions. e.g. [[4,3], [5,4]]"
            placeholder="e.g. [[4,3], [5,4]]"
          />
        </div>
      </Form>
    </Modal>
  );
};

export const AirplaneListPage: FC = () => {
  const history = useHistory();
  const headersData = [
    {
      key: 'name',
      header: 'Airplane Name',
    },
    {
      key: 'map',
      header: 'Seat Map Dimensions',
    },
    {
      key: 'totalSeats',
      header: 'Number of seats',
    },
  ];
  const { state, dispatch } = useAirplaneStateContext();

  const ModalStateManager = ({
    renderLauncher: LauncherContent,
    children: ModalContent,
  }: {
    renderLauncher: React.FunctionComponent<ModalMangerProps>;
    children: React.FunctionComponent<ModalMangerProps>;
  }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        {!ModalContent || typeof document === 'undefined'
          ? null
          : ReactDOM.createPortal(
              <ModalContent open={open} setOpen={setOpen} />,
              document.body,
            )}
        {LauncherContent && <LauncherContent open={open} setOpen={setOpen} />}
      </>
    );
  };
  return (
    <DataTable rows={state} headers={headersData}>
      {({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getToolbarProps,
        getTableContainerProps,
      }) => (
        <TableContainer
          title="Airplanes"
          description="List of airplanes & seat details"
          {...getTableContainerProps()}
        >
          <TableToolbar {...getToolbarProps()} aria-label="data table toolbar">
            <TableToolbarContent>
              <ModalStateManager
                renderLauncher={({ setOpen }) => (
                  <Button
                    data-cy="new-airplane-button"
                    onClick={() => setOpen(true)}
                  >
                    New Airplane
                  </Button>
                )}
              >
                {({ open, setOpen }) => (
                  <ModalForm
                    open={open}
                    onSubmit={(data) => {
                      dispatch({
                        type: 'add',
                        payload: {
                          ...data,
                          id: nanoid(5),
                          totalSeats: Airplane.totalSeats(
                            parseString(data.map),
                          ),
                        },
                      });
                      setOpen(false);
                    }}
                    onCancel={() => setOpen(false)}
                  />
                )}
              </ModalStateManager>
            </TableToolbarContent>
          </TableToolbar>
          <Table {...getTableProps()}>
            <TableHead>
              <TableRow>
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-cy={row.id}
                  {...getRowProps({
                    row,
                  })}
                >
                  {row.cells.map((cell) => (
                    <TableCell
                      key={cell.id}
                      data-cy={`cell-id-${cell.id}`}
                      onClick={() => history.push(`/airplane/${row.id}`)}
                    >
                      {cell.value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
};
