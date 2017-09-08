cd ..
set PROJECT_DIRECTORY=%cd%
cd bin

set war-name=userfaces.war
set tomcat=d:\tomcat

set CATALINA_HOME=d:\tomcat
echo "CATALINA_HOME " %CATALINA_HOME%
echo "PROJECT_DIRECTORY " %PROJECT_DIRECTORY%

echo "**********Copy resource files..."
echo f | xcopy /s/y ..\resources\*.* ..\WebContent\WEB-INF\classes\
echo "**********Copying is finished"
pause "Press any key to continue..."

echo "**********Build java classes..."
cd ../src
dir /s /B *.java > ../bin/sources.txt
javac.exe -sourcepath ./src/ -cp ../WebContent/WEB-INF/lib/* -d ../WebContent/WEB-INF/classes/ @../bin/sources.txt
echo "**********Java classes were built."
pause "Press any key to continue..."

echo "**********Assembling war file..."
cd ../WebContent
if not exist ../dist-war/ mkdir ../dist-war/
jar cvf ../dist-war/%war-name% .
echo "*********War file is ready."
pause "Press any key to continue."

echo "**********Cleaning 'classes' directory."
rd /s /q WEB-INF\classes\
echo "**********'classes' directory are cleaned."
cd ..

echo "**********Copying war-file..."
if not exist %CATALINA_HOME%\webapps\ mkdir %CATALINA_HOME%\webapps\
COPY /Y dist-war\%war-name% %CATALINA_HOME%\webapps\
echo "**********Copying is completed."

cd bin
pause