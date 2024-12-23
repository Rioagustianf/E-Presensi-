import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

// Register a custom font (you may need to adjust the path)
Font.register({
  family: "Roboto",
  src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 30,
  },
  table: {
    display: "table",
    width: "auto",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#bfbfbf",
  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
  },
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StudentPDF = ({
  teacher,
  students,
}: {
  teacher: any;
  students: any[];
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Laporan Wali Kelas</Text>
      <Text style={styles.header}>
        Wali Kelas: {teacher?.name || "Tidak diketahui"}
      </Text>
      <Text style={styles.header}>
        Kelas: {teacher?.class_name || "Tidak diketahui"}
      </Text>
      <Text style={styles.header}>Total Siswa: {students.length}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daftar Siswa</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, { backgroundColor: "#f0f0f0" }]}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>ID</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Nama</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total Kehadiran</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Total Izin</Text>
            </View>
          </View>
          {students.map((student) => (
            <View key={student.id} style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{student.id}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{student.name}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {student.presences?.length || 0}
                </Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>
                  {student.permissions?.length || 0}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </Page>
    {students.map((student) => (
      <Page key={student.id} size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Detail Siswa: {student.name}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kehadiran</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, { backgroundColor: "#f0f0f0" }]}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Tanggal</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Waktu Check In</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Status</Text>
              </View>
            </View>
            {student.presences?.map((presence) => (
              <View key={presence.id} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {formatDate(presence.check_in)}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {formatTime(presence.check_in)}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{presence.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Izin</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, { backgroundColor: "#f0f0f0" }]}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Tanggal</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Alasan</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Status</Text>
              </View>
            </View>
            {student.permissions?.map((permission) => (
              <View key={permission.id} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>
                    {formatDate(permission.created_at)}
                  </Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{permission.reason}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{permission.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    ))}
  </Document>
);

export default StudentPDF;
