import React from "react";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "@mui/material";
import NumericInput from "react-numeric-input";
import InputSpinner from "react-bootstrap-input-spinner";
import "./AdvancedFilter.css";
//import { eventListeners } from "@popperjs/core";

NumericInput.style.input.color = "blue";

//will contain the login for searching with different field parameters
//props here are the word in the search bar and the repo selected

const AdvancedFilter = (props) => {
  const [includeExcludeTitle, setIncludeExcludeTitle] = useState(
    "Select Include/Exclude"
  );
  const [targetHardwareTitle, setTargetHardwareTitle] = useState(
    "Select Target Hardware"
  );
  const [solverTypeTitle, setSolverTypeTitle] = useState("Select Solver Type");
  const [simulationModeTitle, setSimulationModeTitle] = useState(
    "Select Simulation Mode"
  );

  //console.log(props.advancedFilterState);
  //these functions handle the what happens when new value is selected from menu

  function handleBlockCount(event) {
    props.blockCount(event);
  }
  function handleMaxBlockCount(event) {
    props.maxBlockCount(event);
  }
  function handleAlgebraicCount(event) {
    props.algebraicCount(event);
  }
  function handleMaxAlgebraicCount(event) {
    props.maxAlgebraicCount(event);
  }

  function handleSubsysCount(event) {
    props.subsysCount(event);
  }
  function handleMaxSubsysCount(event) {
    props.maxSubsysCount(event);
  }
  function handleSFunctionCount(event) {
    props.uniqueSFunctionCount(event);
  }
  function handleMaxSFunctionCount(event) {
    props.maxUniqueSFunctionCount(event);
  }
  function handleHierarchyDepth(event) {
    props.hierarchyDepth(event);
  }
  function handleMaxHierarchyDepth(event) {
    props.maxHierarchyDepth(event);
  }

  function handleUniqueModelReference(event) {
    props.uniqueModelReference(event);
  }
  function handleMaxUniqueModelReference(event) {
    props.maxUniqueModelReference(event);
  }

  function handleLinkedCount(event) {
    props.libraryLinkedCount(event);
  }

  function handleMaxLinkedCount(event) {
    props.maxLibraryLinkedCount(event);
  }

  function handleCyclomaticComplexity(event) {
    props.cyclomaticComplexity(event);
  }

  function handleMaxCyclomaticComplexity(event) {
    props.maxCyclomaticComplexity(event);
  }

  const handleIncludeExclude = (event) => {
    setIncludeExcludeTitle(event);
    props.includeExclude(event);
  };

  const handleTargetHardware = (event) => {
    setTargetHardwareTitle(event);
    props.targetHardware(event);
  };

  const handleSolverType = (event) => {
    setSolverTypeTitle(event);
    props.solverType(event);
  };

  const handleSimulationMode = (event) => {
    setSimulationModeTitle(event);
    props.simulationMode(event);
  };

  function advancedfilteredSearchTrigger(event) {
    props.advancedFilteredSearchTrigger(event);
  }

  return (
    /*********************filter modal**********************/
    <div className="Home">
      {props.advancedFilterState === true && (
        <>
          <h1>Advanced Filter</h1>
          <div className="modalBackgroundAdvanced">
            <div className="modalContainerAdvanced">
              <div className="title">
                <div className="closeButton">
                  <Button
                    className="searchButton"
                    variant="contained"
                    size="small"
                    onClick={() => props.closeAdvancedFilter(true)}
                  >
                    X
                  </Button>
                </div>
                <div className="titleValue"></div>
              </div>
              <div className="body">
                <Container>
                  <Row>
                    <Col md="4">
                      <h4>Block Count</h4>
                    </Col>
                    <Col md="4">
                      <h4>Algebraic Count </h4>
                    </Col>
                    <Col md="4">
                      <h4>Include/Exclude</h4>
                    </Col>
                  </Row>
                  <Row className="date">
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleBlockCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleMaxBlockCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>

                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleAlgebraicCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleMaxAlgebraicCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="4" className="col-example">
                      <DropdownButton
                        id="dropdown-item-button"
                        title={includeExcludeTitle}
                        onSelect={handleIncludeExclude}
                      >
                        <Dropdown.Item eventKey="Blank" as="button">
                          Blank
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Blank" as="button">
                          Blank
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Blank" as="button">
                          Blank
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <h4>Subsys Count</h4>
                    </Col>
                    <Col md="4">
                      <h4>Unique S-function Count</h4>
                    </Col>
                    <Col md="4">
                      <h4>Target Hardware</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleSubsysCount}
                        variant={"primary"}
                        size="sm"
                        value={"min"}
                      />
                    </Col>

                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleMaxSubsysCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleSFunctionCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleMaxSFunctionCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="4" className="col-example">
                      <DropdownButton
                        id="dropdown-item-button"
                        title={targetHardwareTitle}
                        onSelect={handleTargetHardware}
                      >
                        <Dropdown.Item eventKey="32-bit Generic" as="button">
                          16-bit Generic
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="16-bit Generic" as="button">
                          32-bit Generic
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="ARM Compatible->ARM Cortex"
                          as="button"
                        >
                          ARM Compatible-ARM Cortex
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="ARM Compatible->Cortex - M4"
                          as="button"
                        >
                          ARM Compatible-Cortex - M4
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Atmel->AVR" as="button">
                          Atmel-AVR
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Custom Processor->MATLAB Host Computer"
                          as="button"
                        >
                          Custom Processor-MATLAB Host Computer
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Freescale->32-bit PowerPC"
                          as="button"
                        >
                          Freescale-32-bit PowerPC
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Generic->16-bit Embedded Processor"
                          as="button"
                        >
                          Generic-16-bit Embedded Processor
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Freescale->32-bit PowerPC"
                          as="button"
                        >
                          Freescale-32-bit PowerPC
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Generic->32-bit x86 compatible"
                          as="button"
                        >
                          Generic-32-bit x86 compatible
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Intel->x86-64 (Windows64)"
                          as="button"
                        >
                          Intel-x86-64 (Windows64)
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Intel->x86-64 (Linux 64)"
                          as="button"
                        >
                          Intel-x86-64 (Linux 64)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="MATLAB Host" as="button">
                          MATLAB Host
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="N/A" as="button">
                          N/A
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="STMicroelectronics->STM32 32-bit Cortex-M"
                          as="button"
                        >
                          STMicroelectronics-STM32 32-bit Cortex-M
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="Texas Instruments->C6000"
                          as="button"
                        >
                          Texas Instruments-C6000
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Unspecified" as="button">
                          Unspecified
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Specified" as="button">
                          Specified
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <h4>Hierarchy Depth</h4>
                    </Col>
                    <Col md="4">
                      <h4>Unique Model Reference</h4>
                    </Col>
                    <Col md="4">
                      <h4>Solver Type</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleHierarchyDepth}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleMaxHierarchyDepth}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleUniqueModelReference}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleMaxUniqueModelReference}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="4" className="col-example">
                      <DropdownButton
                        id="dropdown-item-button"
                        title={solverTypeTitle}
                        onSelect={handleSolverType}
                      >
                        <Dropdown.Item eventKey="Fixed-step" as="button">
                          Fixed-step
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="Variable-step" as="button">
                          Variable-step
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="N/A" as="button">
                          N/A
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <h4>Library Linked Count</h4>
                    </Col>
                    <Col md="4">
                      <h4>Cyclomatic Complexity</h4>
                    </Col>
                    <Col md="4">
                      <h4>Simulation Mode</h4>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleLinkedCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleMaxLinkedCount}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>min:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleCyclomaticComplexity}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="2" className="col-example">
                      <h5>max:</h5>
                      <InputSpinner
                        type={"natural"}
                        min={0}
                        onChange={handleMaxCyclomaticComplexity}
                        variant={"primary"}
                        size="sm"
                      />
                    </Col>
                    <Col md="4" className="col-example">
                      <DropdownButton
                        id="dropdown-item-button"
                        title={simulationModeTitle}
                        onSelect={handleSimulationMode}
                      >
                        <Dropdown.Item eventKey="N/A" as="button">
                          N/A
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="accelerator" as="button">
                          accelerator
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="external" as="button">
                          external
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="normal" as="button">
                          normal
                        </Dropdown.Item>
                        <Dropdown.Item
                          eventKey="processor-in-the-loop (pil)"
                          as="button"
                        >
                          processor-in-the-loop (pil)
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="rapid-accelerator" as="button">
                          rapid-accelerator
                        </Dropdown.Item>
                      </DropdownButton>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12" className="advanced-search">
                      <Button
                        className="search-button"
                        variant="contained"
                        size="medium"
                        onClick={advancedfilteredSearchTrigger}
                      >
                        Advanced Search
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvancedFilter;
