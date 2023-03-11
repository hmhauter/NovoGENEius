import React, { useEffect, useState } from "react";
import "./App.scss";

// load material ui component
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";

// import api
import { ApiResponse, getExperimentData, postGene } from "./api/api";

export interface expData {
  experimentData: String;
  cost: Number;
}

function App() {
  const PATH = "mapped-locations";
  const [experimentData, setExperimentData] = useState<String>();
  const [selectedGene, setSelectedGene] = useState<String>();
  const [cost, setCosts] = useState<Number>();
  const [parsedData, setParsedData] = useState<RegExpMatchArray>();
  const [isOpenToast, setIsOpenToast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchExperimentData = async (): Promise<void> => {
    await getExperimentData().then((response) => {
      if (response.success)
        response.data
          ? setExperimentData(response.data)
          : setExperimentData("");
    });
  };

  useEffect(() => {
    setSelectedGene("GCK");

  }, []);

  function parseExperimentSetup(setup: String) {
    const regexPattern = /B(\d+)Y(\d+)H(\d+)Z(-?\d+)/;
    const match = setup.match(regexPattern);
    console.log(parsedData);
    match ? setParsedData(match!!) : console.log("");
  }

  function handleGeneChange(value: String) {
    console.log(value)
    setSelectedGene(value);
  }

  const onSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    console.log("HELP")
    event.preventDefault();
    setIsLoading(false); // TO DO
    console.log("Trying to find this gene:"+selectedGene)
    let _response = await postGene(selectedGene);
    if (_response.success) {
      console.log("POST WAS SUCCESSFULL");
      console.log(_response)
      setExperimentData(_response.data.config)
      parseExperimentSetup(_response.data.config)
      setCosts(_response.data.cost)
      setIsOpenToast(true);
      setIsLoading(false);
    }
  };

  async function get(): Promise<void> {
    let _response = await getExperimentData();
    if (_response.success) {
      setExperimentData(_response.data!);
    } else {
      setIsError(true);
    }
  }

  function renderDropdown(): React.ReactNode {
    if (experimentData) {
      return (
        <>
          <div className="App-location-dropdown">
            <Box
              sx={{
                display: "flex",
                minWidth: 120,
                maxWidth: 800,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  minWidth: 120,
                  maxWidth: 800,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  p: 1,
                  m: 1,
                }}
              >
                <TextField
                  id={`gene-001`}
                  sx={{ m: 1, width: 300 }}
                  key={`gene-001`}
                  variant="outlined"
                  value={"Saturation Mix"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id={`gene-002`}
                  sx={{ m: 1, width: 300 }}
                  label="Optimal Setup"
                  key={`gene-002`}
                  variant="outlined"
                  value={parsedData ? parsedData[1] : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Box>
          </div>
          <div className="App-location-dropdown">
            <Box
              sx={{
                display: "flex",
                minWidth: 120,
                maxWidth: 800,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  minWidth: 120,
                  maxWidth: 800,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  p: 1,
                  m: 1,
                }}
              >
                <TextField
                  id={`gene-001`}
                  sx={{ m: 1, width: 300 }}
                  key={`gene-001`}
                  variant="outlined"
                  value={"Ingestion Compound"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id={`gene-002`}
                  sx={{ m: 1, width: 300 }}
                  label="Optimal Setup"
                  key={`gene-002`}
                  variant="outlined"
                  value={parsedData ? parsedData[2] : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Box>
          </div>
          <div className="App-location-dropdown">
            <Box
              sx={{
                display: "flex",
                minWidth: 120,
                maxWidth: 800,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  minWidth: 120,
                  maxWidth: 800,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  p: 1,
                  m: 1,
                }}
              >
                <TextField
                  id={`gene-001`}
                  sx={{ m: 1, width: 300 }}
                  key={`gene-001`}
                  variant="outlined"
                  value={"Lab Equipment"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id={`gene-002`}
                  sx={{ m: 1, width: 300 }}
                  label="Optimal Setup"
                  key={`gene-002`}
                  variant="outlined"
                  value={parsedData ? parsedData[3] : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Box>
          </div>
          <div className="App-location-dropdown">
            <Box
              sx={{
                display: "flex",
                minWidth: 120,
                maxWidth: 800,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  minWidth: 120,
                  maxWidth: 800,
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "row",
                  p: 1,
                  m: 1,
                }}
              >
                <TextField
                  id={`gene-001`}
                  sx={{ m: 1, width: 300 }}
                  key={`gene-001`}
                  variant="outlined"
                  value={"MC Level"}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id={`gene-002`}
                  sx={{ m: 1, width: 300 }}
                  label="Optimal Setup"
                  key={`gene-002`}
                  variant="outlined"
                  value={parsedData ? parsedData[4] : ""}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Box>
          </div>
          {experimentData ? (
            <div className="App-location-dropdown">
              <Alert
                variant="standard"
                sx={{
                  width: "30%",
                  backgroundColor: "#001965",
                  color: "#FCF2F5",
                  borderColor: "#282c34",
                }}
              >
                {'Expected Costs: '+String(cost!) + '$'}
              </Alert>
            </div>
          ) : (
            <></>
          )}
        </>
      );
    } else {
      return (
        <div>
          Please select Gene to get optimal experiment setup configuration or input new data to help improving the model.
        </div>
      );
    }
  }

  function renderToast(severity: string): React.ReactNode {
    return (
      <Snackbar
        open={isOpenToast}
        autoHideDuration={8000}
        onClose={handleClose}
      >
        {severity == "success" ? (
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{
              width: "100%",
              backgroundColor: "#282c34",
              color: "#F06434",
              borderColor: "#282c34",
            }}
          >
            Gene was searched successfully!
          </Alert>
        ) : (
          <Alert
            onClose={handleClose}
            severity="error"
            sx={{
              width: "100%",
              backgroundColor: "#282c34",
              color: "#F06434",
              borderColor: "#282c34",
            }}
          >
            Error! Please refresh the page and contact your administrator!
          </Alert>
        )}
      </Snackbar>
    );
  }

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setIsOpenToast(false);
  };

  let geneList = ["GCK", "GLP1R", "GATA6"];

  return (
    <div className="App">
      <header className="App-header">Experiment Configuration Selector</header>
      <header className="App-header-small">Powered by NovoGENEius</header>
      <div className="App-container">
        <Box className="App-shop-box">
          <FormControl sx={{ m: 2.5, width: 300 }}>
            <Autocomplete
              className="App-shop-autocomplete"
              disablePortal
              id="shop-combo-box"
              options={geneList!!}
              sx={{ width: 300 }}
              onChange={(event, value) => handleGeneChange(value!)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  className="App-shop-textfield"
                  label="Select Gene"
                />
              )}
            />
          </FormControl>
        </Box>
      </div>
      <Box>
        <Button
          variant="outlined"
          onClick={onSubmit}
          sx={{
            backgroundColor: "#001965",
            color: "#FCF2F5",
            borderColor: "#282c34",
            ":hover": {
              backgroundColor: "#637099",
              color: "white",
            },
            m: 1,
          }}
        >
          Search
        </Button>
        <Button           sx={{
            backgroundColor: "#001965",
            color: "#FCF2F5",
            borderColor: "#282c34",
            ":hover": {
              backgroundColor: "#637099",
              color: "white",
            },
            m: 1,
          }}>Input data</Button>
      </Box>
      {renderToast(isError == true ? "error" : "success")}
      {isLoading ? (
        <Box className="App-location-dropdown" sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : selectedGene ? (
        renderDropdown()
      ) : (
        <>Please select the gene.</>
      )}
    </div>
  );
}

export default App;
