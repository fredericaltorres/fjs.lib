@echo off
set node=node.exe
set unitTestsFolder=UnitTests
set failed=

pushd .
CD "%unitTestsFolder%"

set ut_file=sys_unitTests.js
"%node%" "%ut_file%"
if %ERRORLEVEL% NEQ 0 set failed=%failed%,"%ut_file%"

set ut_file=string_unitTests.js
"%node%" "%ut_file%"
if %ERRORLEVEL% NEQ 0 set failed=%failed%,"%ut_file%"

set ut_file=list_unitTests.js
"%node%" "%ut_file%"
if %ERRORLEVEL% NEQ 0 set failed=%failed%,"%ut_file%"

set ut_file=stack_unitTests.js
"%node%" "%ut_file%"
if %ERRORLEVEL% NEQ 0 set failed=%failed%,"%ut_file%"

set ut_file=dictionary_unitTests.js
"%node%" "%ut_file%"
if %ERRORLEVEL% NEQ 0 set failed=%failed%,"%ut_file%"

popd

REM -------------------------------------
if "%failed%"=="" goto SUCCEEDED
:FAILED
echo [FAILED]
goto END

REM -------------------------------------
:SUCCEEDED
    echo *** ALL UNIT TESTS PASSED ***
goto END


REM -------------------------------------
:END
echo done

pause